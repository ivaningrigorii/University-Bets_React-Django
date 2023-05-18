from collections import Counter
import logging
from rest_framework import serializers

from apps.games.models import Game, Gamer
from apps.teams.models import TeamModel
from django.db.models import Count
from django.db.models import Q


class GameSerializer(serializers.ModelSerializer):
    team_statistic = serializers.SerializerMethodField()

    class Meta:
        model = Game
        read_only_fields = ("team_statistic",)
        fields = (
            "id",
            "date_game",
            "description",
            "place",
            "sport",
            "gameinit",
            "user",
            "team_statistic",
        )

    def get_team_statistic(self, obj):
        if (
            TeamModel.objects.get(name="ничья") is not None
            and Gamer.objects.filter(
                ~Q(team=TeamModel.objects.get(name="ничья")), game=obj.id
            ).exists()
        ):
            query = Gamer.objects.filter(
                ~Q(team=TeamModel.objects.get(name="ничья")), game=obj.id
            )

            return (
                query.values("game")
                .annotate(total=Count("game"))
                .get(game=obj.id)["total"]
            )
        else:
            return 0


class GamerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gamer
        fields = "__all__"


class TeamMinData(serializers.ModelSerializer):
    class Meta:
        model = TeamModel
        fields = (
            "id",
            "name",
            "user",
        )


class GameMinData(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ("id",)
