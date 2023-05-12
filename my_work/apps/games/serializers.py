from collections import Counter
import logging
from rest_framework import serializers

from apps.games.models import Game, Gamer
from apps.teams.models import TeamModel
from django.db.models import Count


class GameSerializer(serializers.ModelSerializer):
    team_statistic = serializers.SerializerMethodField()

    class Meta:
        model = Game
        read_only_fields = ('team_statistic', )
        fields = (
            "id", "date_game", "description", 
            "place", "sport", "gameinit", 
            "user", "team_statistic",
        )

    def get_team_statistic(self, obj):
        try:
            query = Gamer.objects.filter(game=obj.id)
            return query.values('id', 'game').annotate(total=Count('game')).get(game=obj.id)["total"]
        except:
            return 0

class GamerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gamer
        fields = '__all__'


class TeamMinData(serializers.ModelSerializer):
    class Meta:
        model = TeamModel
        fields = ('id', 'name', )


class GameMinData(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', )


    