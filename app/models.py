from __future__ import unicode_literals

from django.db.models import *

class Game(Model):
	time = CharField(max_length=50)
	# TODO date is just self.time parsed into a proper type
	date = DateField()
	boxscore_url = TextField()
	awayteam_name = CharField(max_length=100)
	hometeam_name = CharField(max_length=100)
	worth_watching = BooleanField()