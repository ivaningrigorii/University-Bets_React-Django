from rest_framework import serializers

from apps.teams.models import TeamModel
from django.core.files import File
import base64


class TeamSerializer(serializers.ModelSerializer):
    img_base64 = serializers.SerializerMethodField()

    class Meta:
        model = TeamModel
        fields = (
            "id",
            "name",
            "description",
            "img",
            "img_base64",
            "user",
            "o_power",
            "o_endurance",
            "o_fortitude"
        )

    def get_img_base64(self, obj):
        if obj.img:
            f = open(obj.img.path, "rb")
            image = File(f)
            res = base64.b64encode(image.read())
            f.close()
            return res
