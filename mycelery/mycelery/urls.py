from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework_simplejwt import views as jwt_views
from drf_spectacular import views as drf_views
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


jwtpatterns = [
    re_path(
        r'^token$',
        jwt_views.TokenObtainPairView.as_view(),
        name='token_obtain'
    ),
    re_path(
        r'^refresh$',
        jwt_views.TokenRefreshView.as_view(),
        name='token_refresh'
    ),
    re_path(
        r'^verify$',
        jwt_views.TokenVerifyView.as_view(),
        name='token_verify'
    )
]

urlpatterns = [
    re_path(
        r'^api/schema/redoc$',
        drf_views.SpectacularAPIView.as_view(),
        name='redoc'
    ),
    re_path(
        r'^api/schema/swagger-ui$',
        drf_views.SpectacularSwaggerView.as_view(),
        name='swagger'
    ),
    path(
        'api/rest/',
        include('rest_framework.urls'),
        name='rest_framework'
    ),
    path(
        'auth/v1/',
        include(jwtpatterns)
    ),
    path(
        'schools/v1/',
        include('schools.api.urls')
    ),
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
