from django.urls import re_path
from schools.api import views

app_name = 'schools_api'

urlpatterns = [
    re_path(
        r'^$',
        views.ListSchools.as_view(),
        name='list'
    )
]
