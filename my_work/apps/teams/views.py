import logging
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.teams.models import TeamModel
from apps.teams.serializers import TeamSerializer


class TeamsMy(generics.ListAPIView):
    """
    Просмотр всех команд
    """

    serializer_class = TeamSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return TeamModel.objects.filter(user=user)


class Team(generics.RetrieveUpdateDestroyAPIView):
    """
    Команда и действия с ней
    """

    serializer_class = TeamSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "pk"
    queryset = TeamModel.objects.all()


class TeamCreate(generics.CreateAPIView):
    """
    Создание команды
    """

    serializer_class = TeamSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        _mutable = request.data._mutable
        request.data._mutable = True

        request.data["user"] = request.user.id

        logging.warning(request.data)

        request.data._mutable = _mutable
        return self.create(request, *args, **kwargs)
