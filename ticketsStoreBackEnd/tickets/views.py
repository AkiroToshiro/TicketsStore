from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import viewsets

from .models import *
from .serializers import *

from rest_framework import permissions, viewsets


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


class TicketViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    
    def list(self, request):
        user = request.user
        tickets = Ticket.objects.all().filter(user=user.id)
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)

    def create(self, request):
        user = request.user
        ticket = Ticket(user=user, event=Event.objects.get(id=str(request.data.get('event'))))
        ticket.save()
        return Response({"statusMsg": "Success"}, status=200)
