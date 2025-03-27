import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

from mycelery import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mycelery.settings')

django_asgi_application = get_asgi_application()


application = ProtocolTypeRouter({
    'http': django_asgi_application,
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(routing.urlpatterns)
        )
    )
})
