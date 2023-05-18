import logging
from typing import Iterable, Optional
from uuid import uuid4

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse
from slugify import slugify

from apps.teams.models import TeamModel


class Game(models.Model):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    date_game = models.DateTimeField(verbose_name="Дата проведения игры")
    description = models.TextField(max_length=100, null=True, blank=True)
    place = models.CharField(max_length=100, null=True, blank=True)
    sport = models.CharField(max_length=100)
    gameinit = models.BooleanField(default=False)

    def __str__(self):
        return self.date_game

    def save(self, *args, **kwargs):
        try:
            super(Game, self).save(*args, **kwargs)

            team = None
            try:
                team = TeamModel.objects.get(name="ничья")
            except TeamModel.DoesNotExist:
                pass

            if team is None:
                team = TeamModel(name="ничья")
                team.save()

            Gamer.objects.create(team=team, game=self)
        except Exception as exp:
            logging.warning(exp)

    class Meta:
        verbose_name = "Игра"
        verbose_name_plural = "Игры"


class Gamer(models.Model):
    team = models.ForeignKey(TeamModel, on_delete=models.SET_NULL, null=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=True)
    win = models.BooleanField(verbose_name="Наличие победы", null=True, blank=True)

    def __str__(self):
        return f"Участник {self.team} в игре {self.game}"

    class Meta:
        verbose_name = "Участие"
        verbose_name_plural = "Участники"
