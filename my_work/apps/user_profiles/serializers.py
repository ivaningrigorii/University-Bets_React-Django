from django.contrib.auth import get_user_model
from django.dispatch import receiver
from rest_framework import serializers
from .models import Profile
import base64
from django.core.files import File
from django.db.models.signals import pre_save
from PIL import Image
import logging


class ProfileSerializer(serializers.ModelSerializer):
    base64_image = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'bio', 'img', 'money', 'base64_image', ]

    @receiver(pre_save, sender=Image)
    def pre_save_image(sender, instance, *args, **kwargs):
        try:
            logging.warning("работает")
            old_img = instance.__class__.objects.get(id=instance.id).img.path
            try:
                new_img = instance.image.path
            except:
                new_img = None
            if new_img != old_img:
                import os
                if os.path.exists(old_img):
                    os.remove(old_img)
        except:
            pass

    def get_base64_image(self, obj):
        if obj.img:
            f = open(obj.img.path, 'rb')
            image = File(f)
            res = base64.b64encode(image.read())
            f.close()
            return res


class UserProfileOwnSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, required=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'first_name', 'last_name', 'email', 'profile']

