from rest_framework import serializers

from apps.games.models import Game, Gamer
from apps.teams.models import TeamModel


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class GamerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gamer
        fields = '__all__'