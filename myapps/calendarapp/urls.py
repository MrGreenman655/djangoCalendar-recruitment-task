from django.urls import path

from myapps.calendarapp.views import CalendarTemplateView
from myapps.calendarapp.views_api import EventListAPIView, EventRetrieveAPIView

app_name = "calendar_app"
urlpatterns = [
    path('api/events/', EventListAPIView.as_view(), name='api_events'),
    path('api/event/<int:event_id>/', EventRetrieveAPIView.as_view(), name='api_event'),
    path('calendar/', CalendarTemplateView.as_view(), name='calendar')
]
