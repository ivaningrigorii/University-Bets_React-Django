from uuid import uuid4

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse
from slugify import slugify

import logging


class TeamModel(models.Model):
    name = models.CharField(verbose_name="Название команды", max_length=70)
    description = models.TextField(verbose_name="Описание команды", blank=True)
    img = models.ImageField(
        upload_to="photos/team/%Y/%m/%d/", verbose_name="Фотка", blank=True
    )
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, verbose_name="Пользователь"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Команда"
        verbose_name_plural = "Команды"
