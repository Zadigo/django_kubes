from django.urls import re_path
from mycelery import consumers

app_name = 'home'

urlpatterns = [
    re_path(
        r'^ws/connect$',
        consumers.Home.as_asgi(),
        name='home'
    )
]
