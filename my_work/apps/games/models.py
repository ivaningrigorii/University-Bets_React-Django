from django.db import models
from django.urls import reverse

from apps.teams.models import Team


class Game(models.Model):
    date_game = models.DateTimeField(verbose_name="Дата проведения игры", null=True, blank=True)
    description = models.TextField(max_length=100, null=True, blank=True)
    place = models.CharField(max_length=100, null=True, blank=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    sport = models.CharField(max_length=100)
    deleter = models.BooleanField(verbose_name="Удаление")

    def __str__(self):
        return self.date_game

    def get_absolute_url(self):
        return reverse('post', kwargs={'game_slug': self.slug})

    class Meta:
        verbose_name = 'Игра'
        verbose_name_plural = 'Игры'


class Gamer(models.Model):
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True)
    game = models.ForeignKey(Game, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Участник {self.team} в игре {self.game}"

    class Meta:
        verbose_name = 'Участие'
        verbose_name_plural = 'Участники'




