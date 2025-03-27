from django.contrib import admin
from django.urls import path, re_path
from mykube.views import base as base_views


urlpatterns = [
    re_path(
        r'^api/v1/test',
        base_views.test_endpoint,
        name='test_endpoint'
    ),
    path(
        '',
        base_views.HomeView.as_view(),
        name='home'
    ),
    path(
        'admin/',
        admin.site.urls
    )
]
