from django.db import models

from user.models import User


class Place(models.Model):

    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    capacity = models.IntegerField()


class Event(models.Model):

    name = models.CharField(max_length=100)
    date = models.DateTimeField()
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    about_event = models.CharField(max_length=1024)
    afisha_name = models.CharField(max_length=255)
    afisha_info = models.CharField(max_length=2048)
    capacity = models.IntegerField()
    frontimg = models.ImageField()
    afishaimg = models.ImageField()


class Ticket(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
