import django
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import logout, login

from app import views
from app.forms import *


urlpatterns = [
	url(r'^api/scraped-games', views.scraper_add_game, name='scraper_add_game'),
  
    url(r'^login/$',
        django.contrib.auth.views.login,
        {
            'template_name': 'login.html',
            'authentication_form': BootstrapAuthenticationForm,
        },
        name='login'),
  
    url(r'^logout$',
        django.contrib.auth.views.logout,
        {
            'next_page': '/',
        },
        name='logout'),

    url(r'^accounts/', include('registration.backends.simple.urls')),

    url(r'^admin/', admin.site.urls),
    
	url(r'^$', views.home, name='home'),


]
