from django.urls import path, re_path, include
from .views import *

urlpatterns = [
    path('me/', ProfileOwner.as_view()),
    path('more-me/', RealProfileOwner.as_view()),
]
