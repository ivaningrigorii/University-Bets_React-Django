from rest_framework import serializers

from apps.teams.models import TeamModel


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamModel
        fields = '__all__'
