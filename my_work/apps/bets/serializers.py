from rest_framework import serializers

from apps.bets.models import Bet
from apps.games.models import Gamer


class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = '__all__'


class GamerRatio(serializers.Serializer):
    gamer = serializers.IntegerField()
    ratio = serializers.FloatField()


    
