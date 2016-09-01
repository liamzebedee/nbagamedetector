const jquery = require('jquery');
const env = require('jsdom').env;
const request = require('request');


const GAME_URl = `http://www.espn.com.au/nba/playbyplay?gameId=400876754`;



request(GAME_URl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    

		env({ html: body, done: function (errors, windowObj) {
			if(errors) {
				throw new Error(errors);
			}

			let data = parse(jquery(windowObj));

			console.log(JSON.stringify(data))

			windowObj.close();
		}});


  }
})


function parse($) {
	let data = {
		gameInfo: {
			time: null
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

	// $('#gamepackage-game-information > article > div > div.game-field > div > div > span > span.game-date')

	let longNames = $('.team-info .long-name').map(function(){return $(this).text()})
	let shortNames = $('.team-info .short-name').map(function(){return $(this).text()})

	data.awayTeam.longName = longNames[0], 
	data.homeTeam.longName = longNames[1]

	data.awayTeam.shortName = shortNames[0]
	data.homeTeam.shortName = shortNames[1]


	// do the scores
	let plays = $(`#gp-quarter-4 > table > tbody > tr`);
	
	let i = 0;
	plays.map(function(){
		
	});


	return data;

}