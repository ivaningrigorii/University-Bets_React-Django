from uuid import uuid4

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse
from slugify import slugify


class TeamModel(models.Model):
    name = models.CharField(verbose_name="Название команды", max_length=70)
    description = models.TextField(verbose_name="Описание команды", blank=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL", blank=True)
    img = models.ImageField(upload_to="photos/team/%Y/%m/%d/", verbose_name='Фотка', blank=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, verbose_name='Пользователь')

    def save(self, *args, **kwargs):
        if not self.pk:
            new_slug = slugify(self.name, max_length=100)
            while TeamModel.objects.filter(slug=new_slug).exists():
                new_slug = f'{new_slug}-{uuid4().hex[:7]}'
            self.slug = new_slug
        super(TeamModel, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('team', kwargs={'team_slug': self.slug})

    class Meta:
        verbose_name = 'Команда'
        verbose_name_plural = 'Команды'
