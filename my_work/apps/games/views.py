from time import sleep

from celery import shared_task
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.games.models import Game, Gamer
from apps.teams.models import TeamModel
from apps.games.serializers import GameSerializer, GamerSerializer, TeamMinData, GameMinData
import logging


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

    def get_queryset(self):
        user = self.request.user
        return Game.objects.filter(gameinit=False)


class GamesMy(generics.ListAPIView):
    """
        Все игры создателя
    """
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Game.objects.filter(user=user).filter(gameinit=False)
    

class TeamsMIN(generics.ListAPIView):
    """ Команды, минимальные данные """
    serializer_class = TeamMinData
    permission_classes = (IsAuthenticated, )
    def get_queryset(self):
        user = self.request.user
        return TeamModel.objects.filter(user=user)

    
class ShowGamers(generics.RetrieveAPIView):
    """ Просмотр данных обо всех игроках """
    permission_classes = (IsAuthenticated,)
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        game = get_object_or_404(Game, pk=pk)
        serializer = GameMinData(game)
        gamers_s = GamerSerializer(Gamer.objects.filter(game=pk), many=True)

        gamers_data = gamers_s.data
        for gamer in gamers_data:
            team = TeamModel.objects.get(pk=gamer['team'])
            team_s = TeamMinData(team, many=False)
            gamer["team"] = team_s.data

            if team.user == self.request.user:
                gamer["team"]["is_own"] = True
            else:
                gamer["team"]["is_own"] = False

        response = serializer.data
        response['gamers'] = gamers_data
        return Response(response)



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
    queryset = Gamer.objects.all()




