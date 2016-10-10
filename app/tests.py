import django
from django.test import TestCase
from django.core.urlresolvers import reverse
from django.contrib import auth
from django.contrib.auth.models import User
from django.test.client import Client
from app.models import *


class MainTest(TestCase):
	@classmethod
	def setUp(self):
		pass

	def test_post_new_game_from_scraper(self):
		post_data = '{"gameInfo":{"time":"Today","boxscoreUrl":"http://www.espn.com.au/nba/playbyplay?gameId=400827947","worthWatching":true},"awayTeam":{"longName":"Boston","shortName":"Celtics"},"homeTeam":{"longName":"Indiana","shortName":"Pacers"}}'

		response = self.client.post(reverse('scraper_add_game'), data=post_data, content_type='application/json')
		last_instance = Game.objects.last()
		self.assertIsNotNone(last_instance)
		self.assertEqual(last_instance.boxscore_url, "http://www.espn.com.au/nba/playbyplay?gameId=400827947")
		self.assertEqual(last_instance.hometeam_name, "Indiana Pacers")
		self.assertEqual(last_instance.awayteam_name, "Boston Celtics")
		self.assertEqual(last_instance.time, "Today")
		self.assertEqual(last_instance.worth_watching, True)