import logging

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.bets.models import Bet
from apps.bets.serializers import BetSerializer
from apps.user_profiles.models import Profile


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
    lookup_field = 'pk'
    queryset = Bet.objects.all()

    def delete(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        bet = Bet.objects.get(pk=pk)

        profile = Profile.objects.get(pk=bet.user.pk)
        profile.money = profile.money + bet.money
        profile.save()

        return super(BetOperaions, self).delete(request, *args, **kwargs)


class BetsMy (generics.ListAPIView):
    """
                Все ваши ставки
    """
    serializer_class = BetSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Bet.objects.filter(user=user)
