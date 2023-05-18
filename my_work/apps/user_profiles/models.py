from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model


class HistoryGameInit(models.Model):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    date_game = models.DateTimeField(verbose_name="Дата проведения игры")
    team_name = models.CharField(max_length=300)
    bet_money = models.FloatField()
    win_money = models.FloatField()
    result = models.BooleanField()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(
        max_length=500, blank=True, verbose_name="описание", null=True
    )
    img = models.ImageField(
        upload_to="photos/profile/%Y/%m/%d/",
        verbose_name="фото профиля",
        null=True,
        blank=True,
    )
    money = models.FloatField(
        default=2000, blank=True, verbose_name="состояние человека"
    )

    def __str__(self):
        return f"{self.user}"

    class Meta:
        db_table = "profile"
        verbose_name = "дополнительно о пользователе"
        verbose_name_plural = "дополнительно о пользователях"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
