from django.shortcuts import render, HttpResponse
import json
from app.models import *

from django.views.decorators.csrf import csrf_exempt


def home(req):
	return render(req, 'templates/index.html')


# Actually terrible security
# But this is just a prototype
@csrf_exempt
def scraper_add_game(req):
	data = json.loads(req.body.decode())
	# print(data)
	game = Game.objects.create(
		awayteam_name=data['awayTeam']['longName']+" "+data['awayTeam']['shortName'], 
		hometeam_name=data['homeTeam']['longName']+" "+data['homeTeam']['shortName'],
		boxscore_url=data['gameInfo']['boxscoreUrl'],
		time=data['gameInfo']['time']
	)

	return HttpResponse("Fab.")