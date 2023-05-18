import logging
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from apps.teams.models import TeamModel
from apps.teams.serializers import TeamSerializer
from apps.user_profiles.models import Profile


class TeamsMy(generics.ListAPIView):
    """Просмотр всех команд"""

    serializer_class = TeamSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return TeamModel.objects.filter(user=user)


class Team(generics.RetrieveUpdateDestroyAPIView):
    """Команда и действия с ней"""

    serializer_class = TeamSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "pk"
    queryset = TeamModel.objects.all()

    def destroy(self, request, *args, **kwargs):
        profile = Profile.objects.get(pk=request.user.id)
        profile.money = profile.money + 200
        profile.save()
        return super().destroy(request, *args, **kwargs)


class TeamCreate(generics.CreateAPIView):
    """Создание команды"""

    serializer_class = TeamSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        _mutable = request.data._mutable
        request.data._mutable = True

        request.data["user"] = request.user.id

        profile = Profile.objects.get(pk=request.user.id)

        if profile.money < 200:
            return Response(NotFound(detail="Недостаточно денег", code=404))

        profile.money = profile.money - 200
        profile.save()

        request.data._mutable = _mutable
        return self.create(request, *args, **kwargs)
