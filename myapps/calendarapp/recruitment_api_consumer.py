from pprint import pprint

from django.conf import settings
import requests


class RecruitmentAPIConsumer:
    url = settings.RECRUITMENT_API_URL
    default_headers = {
        'api-key': settings.RECRUITMENT_API_KEY,
    }

    def build_header(self) -> dict:
        return self.default_headers

    def perform_request(self, method: str, url_postfix: str, headers, params: dict | None = None) -> requests.Response:
        return requests.request(
            url=self.url + url_postfix,
            method=method,
            headers=headers,
            params=params,
        )

    def fetch_events(self, params=None):
        url_postfix = 'events/'
        if params:
            url_postfix = 'events/filter/'
        headers = self.build_header()
        method = 'get'
        response = self.perform_request(method, url_postfix, headers, params)
        return response.json()

    def fetch_event(self, event_id: int, params: dict | None = None):
        url_postfix = f'events/{event_id}'
        headers = self.build_header()
        method = 'get'
        response = self.perform_request(method, url_postfix, headers, params)
        return response.json()
