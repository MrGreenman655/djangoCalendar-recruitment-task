from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework.views import APIView

from myapps.calendarapp.custom_swagger_templates import EVENT_LIST_INFO_SWAGGER_TEMPLATE, EVENT_INFO_SWAGGER_TEMPLATE
from myapps.calendarapp.recruitment_api_consumer import RecruitmentAPIConsumer


class EventListAPIView(APIView):

    @extend_schema(**EVENT_LIST_INFO_SWAGGER_TEMPLATE)
    def get(self, request):
        consumer = RecruitmentAPIConsumer()
        r = consumer.fetch_events()
        return Response(r)


class EventRetrieveAPIView(APIView):

    @extend_schema(**EVENT_INFO_SWAGGER_TEMPLATE)
    def get(self, request, event_id):
        consumer = RecruitmentAPIConsumer()
        r = consumer.fetch_event(event_id)
        return Response(r)
