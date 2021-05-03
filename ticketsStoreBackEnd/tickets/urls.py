from django.urls import path

from .views import EventViewSet

urlpatterns = [
    path('eventlist/', EventViewSet.as_view({'get': 'list'}), name='eventList'),
    path('event/<int:pk>', EventViewSet.as_view({'get': 'retrieve'}), name='getEvent')
]
