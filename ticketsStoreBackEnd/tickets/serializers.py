from rest_framework import serializers

from .models import Event, Ticket, Place


class PlaceSerializer(serializers.ModelSerializer):
    place = serializers.SerializerMethodField('get_place')

    def get_place(self, place):
        return '{}, {}'.format(place.name, place.city)

    class Meta:
        model = Place

        fields = ('place',)


class SmallEventSerializer(serializers.ModelSerializer):
    place = PlaceSerializer(read_only=True)
    date = serializers.SerializerMethodField('format_date')

    def format_date(self, event):
        return '{}'.format(event.date.strftime('%d.%m.%Y %H:%M'))

    class Meta:
        model = Event
        
        fields = ('id', 'name', 'date', 'place', 'frontimg', 'price')


class TicketSerializer(serializers.ModelSerializer):
    event = SmallEventSerializer(read_only=True)

    class Meta:
        model = Ticket
        fields = ('id', 'user', 'event')


class FullInfoEventSerializer(serializers.ModelSerializer):
    place = PlaceSerializer(read_only=True)
    date = serializers.SerializerMethodField('format_date')

    def format_date(self, event):
        return '{}'.format(event.date.strftime('%d.%m.%Y %H:%M'))

    class Meta:
        model = Event

        fields = ('id', 'name', 'date', 'place', 'about_event', 'afisha_name', 'afisha_info', 'afishaimg', 'price')
