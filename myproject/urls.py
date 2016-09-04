from django.conf.urls import url
from django.contrib import admin

from app import views

urlpatterns = [
	url(r'^$', views.home, name='home'),
	url(r'^api/scraped-games', views.scraper_add_game, name='scraper_add_game'),

    url(r'^admin/', admin.site.urls),
]
