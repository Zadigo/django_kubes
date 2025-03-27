from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from mycelery import views

# base_patterns = [
#     path(
#         '',
#         views.HomeView.as_view(),
#         name='home'
#     ),
#     path(
#         'admin/',
#         admin.site.urls
#     )
# ]

# urlpatterns = [
#     path('mycelery/', include(base_patterns))
# ]

urlpatterns = [
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


if settings.DEBUG:
    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT
    )
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
