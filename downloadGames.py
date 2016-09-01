from datetime import date
from dateutil.rrule import rrule, DAILY

startDate = date(2015, 10, 27)
endDate = date(2016, 6, 19)

def getGameUrl(date):
	return "http://cdn.espn.go.com/core/nba/schedule/_/date/"+date+"?table=true&device=desktop&edition-host=espn.com.au&userab=0"

for dt in rrule(DAILY, dtstart=startDate, until=endDate):
	datestr = dt.strftime("%Y%m%d")
	print(getGameUrl(datestr))

# \/nba\/game\?gameId\=[0-9]+
# strip "/nba/game?gameId="




# open('')