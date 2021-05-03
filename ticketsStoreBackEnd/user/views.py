from rest_framework.response import Response
from rest_framework import permissions, viewsets
from django.shortcuts import get_object_or_404

from django.contrib.auth.models import User

from .serializers import UserSerializer


class RegisterUserViewSet(viewsets.ViewSet):

    def create(self, request):
        user = User.objects.create(
            username=request.data.get('username'),
            email=request.data.get('email')
        )
        user.set_password(str(request.data.get('password')))
        user.save()
        return Response({"status": "success", "response": "User Successfully Created"}, status=status.HTTP_201_CREATED)


class UserViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated, ]

    def retrieve(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
