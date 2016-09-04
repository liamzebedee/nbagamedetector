from datetime import date
from dateutil.rrule import rrule, DAILY
import re
import urllib2

start_of_season = date(2015, 10, 27)
end_of_season = date(2016, 6, 19)

def get_game_url(date):
	return "http://cdn.espn.go.com/core/nba/schedule/_/date/"+date+"?table=true&device=desktop&edition-host=espn.com.au&userab=0"

pattern = r"\/nba\/game\?gameId\=([0-9]+)"
regex = re.compile(pattern, re.IGNORECASE)

for date in rrule(DAILY, dtstart=start_of_season, until=end_of_season):
	date_str = date.strftime("%Y%m%d")

	game_details_html = urllib2.urlopen(get_game_url(date_str)).read()

	for match in regex.finditer(game_details_html):
		game_id = match.group(1)

		