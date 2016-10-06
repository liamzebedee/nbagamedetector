import time
from datetime import date
from dateutil.rrule import rrule, DAILY
import re
import urllib2
import os
import subprocess

start_of_season = date(2015, 10, 27)
# TODO EDIT THIS WHEN CHANGE
end_of_season = date(2016, 2, 26)

def get_game_url(date):
	return "http://cdn.espn.go.com/core/nba/schedule/_/date/"+date+"?table=true&device=desktop&edition-host=espn.com.au&userab=0"

def get_game_plays_url(date):
	return ""

pattern = r"\/nba\/game\?gameId\=([0-9]+)"
regex = re.compile(pattern, re.IGNORECASE)

def chunks(l, n):
	"""Yield successive n-sized chunks from l."""
	for i in range(0, len(l), n):
		yield l[i:i + n]

for date in reversed(list(rrule(DAILY, dtstart=start_of_season, until=end_of_season))):
	date_str = date.strftime("%Y%m%d")

	try:
		game_details_html = urllib2.urlopen(get_game_url(date_str)).read()
	except:
		print("Error - sleepin' for 3 secs")
		time.sleep(3)
		game_details_html = urllib2.urlopen(get_game_url(date_str)).read()

	matches = regex.findall(game_details_html)
	
	for chunk in chunks(matches, 6):
		for match in list(chunk):
			game_id = match

			# call nodejs with game id and time
			# cmd = 'node scrapeGame.js %s %s &' % (game_id, date.strftime('"%d/%m/%Y"'))
			cmd = 'wget -bqc -O data/'+game_id+'.html'+' http://www.espn.com.au/nba/playbyplay?gameId='+game_id
			# print("Running %s" % cmd)
			# os.system(cmd)
			# os.spawnl(os.P_DETACH, cmd)
			subprocess.call(cmd, shell=True)
			# os.system()

		# time.sleep(5) # to not fuck the server or our CPU



