from django.shortcuts import render, HttpResponse
import json
from app.models import *
from app.forms import * 

from django.views.decorators.csrf import csrf_exempt


def home(req):
	games = Game.objects.order_by('-date')[:100]
	
	return render(req, 'templates/home.html', {
		'games': games,
	})


# Actually terrible security
# But this is just a prototype
@csrf_exempt
def scraper_add_game(req):
	data = json.loads(req.body.decode())
	game = Game.objects.create(
		awayteam_name=data['awayTeam']['longName']+" "+data['awayTeam']['shortName'], 
		hometeam_name=data['homeTeam']['longName']+" "+data['homeTeam']['shortName'],
		boxscore_url=data['gameInfo']['boxscoreUrl'],
		time=data['gameInfo']['time'],
		worth_watching=data['gameInfo']['worthWatching']
	)

	return HttpResponse("Fab.")