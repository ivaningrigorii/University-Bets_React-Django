from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


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
