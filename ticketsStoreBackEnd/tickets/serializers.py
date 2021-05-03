from rest_framework import serializers

from .models import Event


class SmallEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        
        fields = ('id', 'name', 'date', 'place', 'frontimg')


class FullInfoEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event

        fields = ('id', 'name', 'date', 'place', 'about_event', 'afisha_name', 'afisha_info', 'afishaimg')
