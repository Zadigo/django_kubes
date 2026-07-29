from django.contrib import admin
from django.urls import include, path, re_path
from oauth2_provider import urls as oauth2_urls

from mykube.views import base as base_views

urlpatterns = [
    path('__reload__/', include('django_browser_reload.urls')),
    path('o/', include(oauth2_urls)),
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
