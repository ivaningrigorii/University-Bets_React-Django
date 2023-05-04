from django.contrib import admin
from django.urls import path, include
from .yasg import urlpatterns as doc_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('djoser.urls')),
    path('accounts/', include('rest_framework.urls')),
    path('api/v1/login/', include('djoser.urls.jwt')),

    path('api/v1/profile/', include('apps.user_profiles.urls')),
    path('api/bet/', include('apps.bets.urls')),
    path('api/game/', include('apps.games.urls')),
    path('api/team/', include('apps.teams.urls')),
]

urlpatterns += doc_urls