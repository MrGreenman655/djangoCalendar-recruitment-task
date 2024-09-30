from drf_spectacular.utils import OpenApiResponse, OpenApiParameter

EVENT_LIST_INFO_SWAGGER_TEMPLATE = {
    'summary': "Get events information filtered by tag",
    'description': "Returns event list with date as such as name, start time, duration, location, and tags, filtered by the provided tag in the query parameter.",
    'parameters': [OpenApiParameter(
        name='tag',
        description='Name of the tag to filter events by',
        required=False,
        type=str,
        location=OpenApiParameter.QUERY,
    )
    ],
    'responses': {
        200: OpenApiResponse(response={
            'type': 'object',
            'properties': {
                'id': {'type': 'integer', 'description': 'Unique ID of the event'},
                'name': {'type': 'string', 'description': 'Name of the event'},
                'start_time': {'type': 'string', 'format': 'date-time', 'description': 'Start time of the event'},
                'duration': {'type': 'integer', 'description': 'Duration of the event (in hours)'},
                'image_url': {'type': 'string', 'description': 'URL of the event image'},
                'short_description': {'type': 'string', 'description': 'Short description of the event'},
                'tags': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'id': {'type': 'integer', 'description': 'Tag ID'},
                            'name': {'type': 'string', 'description': 'Tag name'}
                        }
                    },
                    'description': 'List of tags associated with the event'
                }
            },
            'example': {
                'id': 0,
                'name': 'Jubileuszowy Piknik Naukowy z Uniwersytetem w Siedlcach',
                'start_time': '2024-10-02T10:00:00',
                'duration': 2,
                'image_url': '/media/442435186_947649987362224_3464617144294814090_n.webp',
                'short_description': 'Jubileuszowy Piknik Naukowy UwS to dzień pełen atrakcji...',
                'tags': [
                    {'id': 1, 'name': 'piknik'},
                    {'id': 2, 'name': 'popularyzacja nauki'},
                    {'id': 3, 'name': 'uws'}
                ]
            }
        })
    }
}

EVENT_INFO_SWAGGER_TEMPLATE = {
    'summary': "Get event information",
    'description': "Returns event details such as name, start time, duration, location, and tags, filtered by the provided tag in the query parameter.",
    'responses': {
        200: OpenApiResponse(response={
            'type': 'object',
            'properties': {
                'id': {'type': 'integer', 'description': 'Unique ID of the event'},
                'name': {'type': 'string', 'description': 'Name of the event'},
                'start_time': {'type': 'string', 'format': 'date-time', 'description': 'Start time of the event'},
                'duration': {'type': 'integer', 'description': 'Duration of the event (in hours)'},
                'location': {'type': 'string', 'description': 'Location of the event'},
                'image_url': {'type': 'string', 'description': 'URL of the event image'},
                'registration_link': {'type': 'string', 'description': 'Registration link for the event'},
                'short_description': {'type': 'string', 'description': 'Short description of the event'},
                'long_description': {'type': 'string', 'description': 'Detailed description of the event'},
                'tags': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'id': {'type': 'integer', 'description': 'Tag ID'},
                            'name': {'type': 'string', 'description': 'Tag name'}
                        }
                    },
                    'description': 'List of tags associated with the event'
                }
            },
            'example': {
                'id': 0,
                'name': 'Jubileuszowy Piknik Naukowy z Uniwersytetem w Siedlcach',
                'start_time': '2024-10-02T10:00:00',
                'duration': 2,
                'location': 'ul. żytnia 39, 08-110 Siedlce',
                'image_url': '/media/442435186_947649987362224_3464617144294814090_n.webp',
                'registration_link': 'https://www.facebook.com/events/957459285821359/',
                'short_description': 'Jubileuszowy Piknik Naukowy UwS to dzień pełen atrakcji...',
                'long_description': 'Zapraszamy na niesamowity Jubileuszowy Piknik Naukowy...',
                'tags': [
                    {'id': 1, 'name': 'piknik'},
                    {'id': 2, 'name': 'popularyzacja nauki'},
                    {'id': 3, 'name': 'uws'}
                ]
            }
        })
    }
}