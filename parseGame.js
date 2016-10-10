const jquery = require('jquery');
const env = require('jsdom').env;
const request = require('request');
const fs = require('fs')


console.log('Syntax: node parseGame [file]')

let file = process.argv[2]

console.log("Parsing file...")

let content = fs.readFileSync(file, { encoding: 'utf-8'})

env({ html: content, done: function (errors, windowObj) {
	if(errors) {
		throw new Error(errors);
	}

	let data = parse(jquery(windowObj));

	console.log(JSON.stringify(data))

	// return false;

	// Now to POST the data to the Django API
	request.post(
	    'http://localhost:8000/api/scraped-games',
	    {json:data},
	    function(error, response, body) {
	        console.log(error, ' ', response.statusCode)
	    }
	);

	windowObj.close();
}});


function parse($) {
	let gameTime = $('title').text().split(' - ')[2];
	const GAME_URL = $('meta[property="og:url"]').attr('content');


	let data = {
		gameInfo: {
			time: gameTime,
			boxscoreUrl: GAME_URL,
			worthWatching: null	
		},

		awayTeam: {
			longName: "",
			shortName: "",
		},

		homeTeam: {
			longName: "",
			shortName: "",
		}
	};


	let longNames = $('.team-info .long-name').map(function(){return $(this).text()})
	let shortNames = $('.team-info .short-name').map(function(){return $(this).text()})

	data.awayTeam = {
		longName: longNames[0],
		shortName: shortNames[0]
	}
	data.homeTeam = {
		longName: longNames[1],
		shortName: shortNames[1]
	}

	// quarter 4 plays
	let $plays = $($(`#gp-quarter-4 > table > tbody`).children().get());
	
	// plays from 5:00 to 0:00 mins
	let $playsWeCareAbout = [];
	let found = false;

	$plays.each(function(i) {
		let time = $('.time-stamp', this).text();
		if(!found && time.startsWith('4')) {
			// we've hit the first recorded 5 minute mark.
			$playsWeCareAbout = $($plays.splice(i-1, $plays.length));
			found = true;
		}
	});

	let playsWeCareAbout = [];

	$playsWeCareAbout.each(function(i) {
		let time = $('.time-stamp', this).text();
		let scores = $('.combined-score', this).text().split(' - ');
		playsWeCareAbout.push({
			time,
			awayTeamScore: scores[0],
			homeTeamScore: scores[1]
		})
	})


	function isOvertime() {
		return $('#gp-quarter-5') == null;
	}
	
	function atOneMinuteToGoTheScoreIsWithin5() {
		for(let i = 0; i < playsWeCareAbout.length; i++) {
			let play = playsWeCareAbout[i]
			if(play.time.startsWith('1')) {
				return Math.abs(play.awayTeamScore - play.homeTeamScore) < 5;
			}
		}
		throw new Error("shouldnt get here");
	}

	function endScoreWithin3() {
		let play = playsWeCareAbout[0];
		return Math.abs(play.homeTeamScore - play.awayTeamScore) < 3;
	}

	function leadChange() {
		let playAt3Min, endPlay;

		for(let i = 0; i < playsWeCareAbout.length; i++) {
			let play = playsWeCareAbout[i]
			console.log(play.time)
			if(play.time.startsWith('3')) {
				playAt3Min = play;
			}
		}

		endPlay = playsWeCareAbout[0];

		let diffat3mins = playAt3Min.awayTeamScore - playAt3Min.homeTeamScore
		let diffatend = endPlay.awayTeamScore - endPlay.homeTeamScore

		return (diffat3mins * diffatend) < 0; 
	}

	function isGameWorthWatching() {
		let metrics = [
			{ name: "Overtime", result: isOvertime() },
			{ name: "Close score in last 5min", result: atOneMinuteToGoTheScoreIsWithin5() },
			{ name: "Change in lead", result: leadChange() },
			{ name: "End score within 3", result: endScoreWithin3() },
		]

		metrics.map(metric => {
			if(metric.result)
				console.log(`${metric.name}`)
		})

		return metrics.reduce(
			(initialValue, currentValue) => (initialValue || currentValue.result), 
			false
		)
	}

	data.gameInfo.worthWatching = isGameWorthWatching()

	return data;
}