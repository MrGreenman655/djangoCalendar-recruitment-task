from django.urls import reverse_lazy
from django.views.generic import TemplateView


# Create your views here.
class CalendarTemplateView(TemplateView):
    template_name = 'calendarapp/calendar.html'
    extra_context = {
        'api_get_events_link': reverse_lazy('calendar_app:api_events'),
    }