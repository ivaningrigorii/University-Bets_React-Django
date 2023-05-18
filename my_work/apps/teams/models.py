from uuid import uuid4

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse
from slugify import slugify
import random

import logging


class TeamModel(models.Model):
    name = models.CharField(verbose_name="Название команды", max_length=70)
    description = models.TextField(verbose_name="Описание команды", blank=True)

    o_power = models.IntegerField(verbose_name="Сила", blank=True, default=0)
    o_endurance = models.IntegerField(verbose_name="Выносливость", blank=True, default=0)
    o_fortitude = models.IntegerField(verbose_name="Сила духа", blank=True, default=0)

    img = models.ImageField(
        upload_to="photos/team/%Y/%m/%d/", verbose_name="Фотка", blank=True
    )
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, verbose_name="Пользователь",
        blank=True, null=True,
    )

    def save(self, *args, **kwargs):
        if (self.name != 'ничья'):
            if (self.id is None):
                self.o_power = random.randint(1, 100)
                self.o_endurance = random.randint(1, 100)
                self.o_fortitude = random.randint(1, 100)

        super(TeamModel, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Команда"
        verbose_name_plural = "Команды"
