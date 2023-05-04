from django.db import models
from django.urls import reverse


class Team(models.Model):
    name = models.CharField(verbose_name="Название команды", max_length=70)
    description = models.TextField(verbose_name="Описание команды")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    img = models.ImageField(upload_to="photos/team/%Y/%m/%d/", verbose_name='Фотка', blank=True)
    deleter = models.BooleanField(verbose_name="Удаление")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('team', kwargs={'team_slug': self.slug})

    class Meta:
        verbose_name = 'Команда'
        verbose_name_plural = 'Команды'
