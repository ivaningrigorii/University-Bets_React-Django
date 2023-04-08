from django.db import models

from apps.games.models import Gamer


class Bet(models.Model):
    date_bet = models.DateTimeField(auto_now_add=True, verbose_name='Дата ставки')
    money = models.FloatField(verbose_name="сумма ставки")
    gamer = models.ForeignKey(Gamer, on_delete=models.SET_NULL, null=True)
