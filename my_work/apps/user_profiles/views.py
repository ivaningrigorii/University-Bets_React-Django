from django.shortcuts import get_object_or_404
from rest_framework import generics

from apps.user_profiles.serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class ProfileOwner(generics.RetrieveUpdateAPIView):
    """
    Работа с user моделью авторизованного пользователя.
    """

    serializer_class = UserProfileOwnSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        user = self.request.user
        return get_user_model().objects.get(id=user.pk)


class RealProfileOwner(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        profile = get_object_or_404(Profile, pk=self.request.user.pk)
        return profile


class Money(generics.RetrieveAPIView):
    serializer_class = MoneySerializer
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user_id = request.user.id 
        profile = Profile.objects.get(id=user_id)
        serializer = MoneySerializer(profile, many=False)
        
        return Response(serializer.data)

        
