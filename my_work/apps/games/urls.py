from django.contrib import admin
from django.urls import path, include

from apps.games.views import *

urlpatterns = [
    path('all/', Games.as_view()),
    path('my/all/', GamesMy.as_view()),
    path('<int:pk>/', GameOperaions.as_view()),
    path('', GameCreate.as_view()),
    path('gamer/', GamerAdd.as_view()),
    path('gamer/<int:pk>/', ShowGamers.as_view()),
    path('gamer/other/<int:pk>/', GamerDel.as_view()),
    path('teams/min-data/', TeamsMIN.as_view()),
    path('games/for-bets/', GamesBets.as_view()),
    path('gamers/for-bets/<int:pk>/', ShowGamersForBets.as_view()),
]