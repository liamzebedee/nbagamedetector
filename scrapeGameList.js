const jquery = require('jquery');
const env = require('jsdom').env;
const request = require('request');


const GAME_URl = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?lang=en&region=au&calendartype=blacklist&limit=100&dates=20160529&tz=Australia%2FMelbourne`;



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


}