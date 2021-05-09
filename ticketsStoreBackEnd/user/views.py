from rest_framework.response import Response
from rest_framework import permissions, viewsets
from django.shortcuts import get_object_or_404

from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password

from .serializers import UserSerializer

from rest_framework import status
from django.contrib.auth.hashers import make_password
from ticketsStoreBackEnd.settings import SECRET_KEY


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

    def update(self, request):
        user = request.user
        password1 = str(request.data.get('password1'))
        password2 = str(request.data.get('password2'))
        if password1 == password2:
            if check_password(password1, user.password):
                user.set_password(str(request.data.get('password3')))
                user.save()
                return Response({"statusMsg": "Password changed"}, status=200)
            else:
                return Response({"statusMsg": "Not correct password"}, status=406)
        else:
            return Response({"statusMsg": "Passwords do not match "}, status=406)


class UserUpdateViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated, ]

    def update(self, request):
        user = request.user
        newFirstName = str(request.data.get('newFirstName'))
        newSecondName = str(request.data.get('newSecondName'))
        newEmail = str(request.data.get('newEmail'))
        newUsername = str(request.data.get('newUsername'))
        print(newFirstName)
        if newFirstName != '':
            user.first_name = newFirstName
        if newSecondName != '':
            user.secondName = newSecondName
        if newEmail != '':
            user.email = newEmail
        if newUsername != '':
            user.username = newUsername
        user.save()
        return Response({"statusMsg": "Password changed"}, status=200)
