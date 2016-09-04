import time
from datetime import date
from dateutil.rrule import rrule, DAILY
import re
import urllib2
import os
from subprocess import call


start_of_season = date(2015, 10, 27)
end_of_season = date(2016, 6, 19)

def get_game_url(date):
	return "http://cdn.espn.go.com/core/nba/schedule/_/date/"+date+"?table=true&device=desktop&edition-host=espn.com.au&userab=0"

pattern = r"\/nba\/game\?gameId\=([0-9]+)"
regex = re.compile(pattern, re.IGNORECASE)

def chunks(l, n):
	"""Yield successive n-sized chunks from l."""
	for i in range(0, len(l), n):
		yield l[i:i + n]


for date in rrule(DAILY, dtstart=start_of_season, until=end_of_season):
	date_str = date.strftime("%Y%m%d")

	game_details_html = urllib2.urlopen(get_game_url(date_str)).read()

	matches = regex.findall(game_details_html)
	
	for chunk in chunks(matches, 6):
		for match in list(chunk):
			game_id = match

			# call nodejs with game id and time
			cmd = 'node scrapeGame.js %s %s &' % (game_id, date.strftime('"%d/%m/%Y"'))
			print("Running %s" % cmd)
			os.system(cmd)
			# subprocess.Popen(["node", "scrapeGame.js", game_id, date.strftime('"%d/%m/%Y"')])
			# os.spawnlp(os.P_NOWAIT, "node", "scrapeGame.js", game_id, date.strftime('"%d/%m/%Y"'))
			# os.popen(cmd)

		time.sleep(5) # to not fuck the server or our CPU