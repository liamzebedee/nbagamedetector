const jquery = require('jquery');
const env = require('jsdom').env;
const request = require('request');



console.log('Syntax: node scrapeGame [gameid] [gametime]')

let gameId = +(process.argv[2]);
let gameTime = process.argv[3]; // we just pass this through from Python, it's not actually used except in output
const GAME_URL = `http://www.espn.com.au/nba/playbyplay?gameId=${gameId}`;


console.log(`Scraping from ${GAME_URL}`)
request(GAME_URL, function (error, response, body) {
  if (!error && response.statusCode == 200) {

		env({ html: body, done: function (errors, windowObj) {
			if(errors) {
				throw new Error(errors);
			}

			let data = parse(jquery(windowObj));

			console.log(JSON.stringify(data))

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


  }
})


function parse($) {
	let data = {
		gameInfo: {
			time: gameTime,
			boxscoreUrl: GAME_URL
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

	
/*
	// do the scores
	// loop from 0:00 to 5:00 mins (so bottom-up)
	let $plays = $($(`#gp-quarter-4 > table > tbody`).children().get().reverse());
	let $playsWeCareAbout = [];
	let found = false;

	$plays.each(function(i) {
		let time = $('.time-stamp', this).text();
		if(!found && time.startsWith('5')) {
			// we've hit the first recorded 5 minute mark.
			$playsWeCareAbout = $($plays.splice(i, $plays.length-1));
			found = true;
		}
	});

	let plays = [];

	$playsWeCareAbout.each(function(i) {
		let time = $('.time-stamp', this).text();
		let scores = $('.combined-score', this).text().split(' - ');
		plays.push({
			time,
			awayTeamScore: scores[0],
			homeTeamScore: scores[1]
		})
	})
*/
	
	// function isLeadChange(plays) {
	// 	let lead = Math.max(plays[0]

	// 	plays.forEach((play) => {

	// 	})
	// }

	// function isGameWorthWatching(plays) {
	// 	return isLeadChange(plays);
	// }


	// let worth = isGameWorthWatching(plays)
	// if(worth) console.log(`WORTH IT ${GAME_URL}`)

	// console.log(JSON.stringify(data))
	return data;
}