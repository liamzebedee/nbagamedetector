from django.shortcuts import render

def home(req):
	return render(req, 'templates/index.html')