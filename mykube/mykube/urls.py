from django.contrib import admin
from django.urls import path, re_path
from mykube.views import base as base_views


urlpatterns = [
    path('', base_views.HomeView.as_view(), name='home'),
    path('admin/', admin.site.urls),
]
