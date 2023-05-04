from django.urls import path

from apps.teams.views import *

urlpatterns = [
    path('all/', TeamsMy.as_view()),
    path('<int:pk>/', Team.as_view()),
    path('', TeamCreate.as_view()),
]