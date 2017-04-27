import datetime

from django.http import HttpResponse
from django.shortcuts import render, render_to_response


# Create your views here.
def sayHello(request):

    return render_to_response("index.html")