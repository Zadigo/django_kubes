from django.urls import re_path
from schools import consumers

app_name = 'home'

urlpatterns = [
    re_path(
        r'^ws/government$',
        consumers.GovernmentEndpoint.as_asgi(),
        name='government'
    ),
    re_path(
        r'^ws/schools$',
        consumers.SchoolEndpoint.as_asgi(),
        name='school'
    )
]
