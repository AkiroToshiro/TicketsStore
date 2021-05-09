from django.urls import path

from .views import EventViewSet, TicketViewSet

urlpatterns = [
    path('eventlist/', EventViewSet.as_view({'get': 'list'}), name='eventList'),
    path('event/<int:pk>', EventViewSet.as_view({'get': 'retrieve'}), name='getEvent'),
    path('ticketslist/', TicketViewSet.as_view({'get': 'list'})),
    path('buy/', TicketViewSet.as_view({'post': 'create'})),
]
