from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path
from django.views.decorators.csrf import csrf_exempt
from drf_spectacular import views as drf_views
from graphene_django.views import GraphQLView
from oauth2_provider import urls as oauth2_urls
from oauth_dcr import views as oauth_dcr_views

from mykube.views import base as base_views

urlpatterns = [
    path(
        'api/rest/',
        include('rest_framework.urls'),
        name='rest_framework'
    ),
    path(
        'api/schema/',
        drf_views.SpectacularAPIView.as_view(),
        name='schema'
    ),
    path(
        'api/schema/swagger-ui/',
        drf_views.SpectacularSwaggerView.as_view(url_name='schema'),
        name='swagger-ui'
    ),
    path(
        'api/schema/redoc/',
        drf_views.SpectacularRedocView.as_view(url_name='schema'),
        name='redoc'
    ),
    path(
        '__reload__/', 
        include('django_browser_reload.urls')
    ),
    path(
        'agents/',
        include(('mcp_server.urls', 'mcp_server'), namespace='mcp_server')
    ),
    path(
        'graphql/',
        csrf_exempt(GraphQLView.as_view(graphiql=True)),
        name='graphql'
    ),
    path(
        'o/register/',
        oauth_dcr_views.DynamicClientRegistrationView.as_view(),
        name='oauth2_dcr'
    ),
    path(
        'o/', 
        include(oauth2_urls)
    ),
    re_path(
        r'^o/challenge/$',
        base_views.CodeVerifierView.as_view(),
        name='code_verifier'
    ),
    re_path(
        r'^api/v1/test/$',
        base_views.test_endpoint,
        name='test_endpoint'
    ),
    re_path(
        r'^api/v1/protected/$',
        base_views.ProtectedView.as_view(),
        name='protected'
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

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT
    )
