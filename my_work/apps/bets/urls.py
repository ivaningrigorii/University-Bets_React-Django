from django.contrib import admin
from django.urls import path, include

from apps.bets.views import *

urlpatterns = [
    path("my/all/", BetsMy.as_view()),
    path("<int:pk>/", BetOperaions.as_view()),
    path("", BetCreate.as_view()),
    path("in-game/<int:pk>/", BetsMyInGame.as_view()),
    path("ratios/<int:pk>/", BetK.as_view()),
]
