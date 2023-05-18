import logging
from django.shortcuts import get_object_or_404

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.bets.models import Bet
from apps.bets.serializers import BetSerializer
from apps.user_profiles.models import Profile
from apps.games.models import Game
from apps.games.serializers import GameSerializer
from apps.games.models import Gamer


class BetCreate(generics.CreateAPIView):
    """
    Поставить ставку
    """

    serializer_class = BetSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        profile = Profile.objects.get(pk=request.user.id)
        money = request.data["money"]

        if money <= 0 or money > profile.money:
            return Response(status=status.HTTP_403_FORBIDDEN)

        profile.money = profile.money - money
        profile.save()
        return self.create(request, *args, **kwargs)


class BetOperaions(generics.RetrieveUpdateDestroyAPIView):
    """
    Ставка и действия с ней
    """

    serializer_class = BetSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "pk"
    queryset = Bet.objects.all()

    def delete(self, request, *args, **kwargs):
        pk = self.kwargs.get("pk")
        bet = Bet.objects.get(pk=pk)

        profile = Profile.objects.get(pk=bet.user.pk)
        profile.money = profile.money + bet.money
        profile.save()

        return super(BetOperaions, self).delete(request, *args, **kwargs)


class BetsMy(generics.ListAPIView):
    """
    Все ваши ставки
    """

    serializer_class = BetSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Bet.objects.filter(user=user)


class BetsMyInGame(generics.RetrieveAPIView):
    """Ваша ставка на игру"""

    permission_classes = (IsAuthenticated,)
    serializer_class = BetSerializer
    lookup_field = "pk"

    def get(self, request, *args, **kwargs):
        result = {"bets": []}

        user = self.request.user
        game = get_object_or_404(Game, pk=kwargs.get("pk"))
        gamers = Gamer.objects.filter(game=game)
        bets = list(Bet.objects.filter(user=user, gamer__in=gamers))

        s_bets = BetSerializer(bets, many=True)

        result["bets"] = s_bets.data
            
        return Response(result)
    

