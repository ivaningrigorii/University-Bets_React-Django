from time import sleep

from celery import shared_task
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.games.models import Game, Gamer
from apps.games.serializers import GameSerializer, GamerSerializer


class GameCreate(generics.CreateAPIView):
    """
            Создание игры
    """
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        return self.create(request, *args, **kwargs)


class GameOperaions(generics.RetrieveUpdateDestroyAPIView):
    """
            Игра и действия с ней
    """
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'pk'
    queryset = Game.objects.all()


class Games(generics.ListAPIView):
    """
                Все игры
    """
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Game.objects.all()


class GamesMy(generics.ListAPIView):
    """
        Все игры создателя
    """
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Game.objects.filter(user=user)


class GamerAdd(generics.CreateAPIView):
    """
        Добавления команды как участника в игре
    """
    serializer_class = GamerSerializer
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class GamerDel(generics.DestroyAPIView):
    """
        Удаление команды из участников в игре
    """
    lookup_field = 'pk'
    serializer_class = GamerSerializer
    permission_classes = (IsAuthenticated, )

