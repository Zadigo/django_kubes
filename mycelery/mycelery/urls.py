from django.contrib import admin
from django.urls import path, re_path, include
from django.urls import reverse_lazy
from django.views.generic import RedirectView
from mycelery import views

base_patterns = [
    path(
        '',
        views.HomeView.as_view(),
        name='home'
    ),
    path(
        'admin/',
        admin.site.urls
    )
]

urlpatterns = [
    path('mycelery/', include(base_patterns))
]
