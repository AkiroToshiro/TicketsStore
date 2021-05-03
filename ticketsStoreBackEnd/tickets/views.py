from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import viewsets

from .models import *
from .serializers import SmallEventSerializer, FullInfoEventSerializer


class EventViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Event.objects.all().order_by('date')
        serializer = SmallEventSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Event.objects.all()
        event = get_object_or_404(queryset, pk=pk)
        serializer = FullInfoEventSerializer(event)
        return Response(serializer.data)
