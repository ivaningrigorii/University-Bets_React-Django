import logging
from django.contrib.auth import get_user_model
from rest_framework import permissions, exceptions
from rest_framework.generics import get_object_or_404

from apps.analitics.simple_analytics.models import SimpleAnalytics
from apps.survey_manage.answer_blocks.models import IAnswer
from apps.survey_manage.question_blocks.models import IQuestion
from apps.survey_manage.survey_base.models import ISurvey
from apps.survey_passing.models import TakingSurvey, IResultAnswer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owner of an object to edit it.
    Assumes the model instance has an 'owner' attribute.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user
