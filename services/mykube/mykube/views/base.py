import base64
import hashlib
import random
import string

from django.core.cache import cache
from django.views.generic import TemplateView
from drf_spectacular.utils import extend_schema
from oauth2_provider.views.generic import ProtectedResourceMixin
from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from mykube.api.rest.serializers import CodeChallengeSerializer


# @method_decorator(cache_page(2 * 60), name='dispatch')
class HomeView(TemplateView):
    template_name = 'home.html'


@api_view(http_method_names=['get'])
def test_endpoint(request):
    return Response({'status': True})


class ProtectedView(ProtectedResourceMixin, GenericAPIView):
    def get(self, request, *args, **kwargs):
        return Response({'status': True})


@extend_schema(
    description="Generates a code verifier and code challenge for PKCE (Proof Key for Code Exchange). The code verifier is a random string between 43 and 128 characters, and the code challenge is a SHA256 hash of the code verifier, base64-url-encoded without padding.",
    tags=['Authentication'],
    responses={200: CodeChallengeSerializer}
)
class CodeVerifierView(GenericAPIView):
    """A view that generates a code verifier and code challenge for PKCE (Proof Key for Code Exchange)."""

    def get(self, request, *args, **kwargs):
        result = cache.get('code_challenge', None)
        if result is None:
            code_verifier = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(43, 128)))

            code_challenge = hashlib.sha256(code_verifier.encode('utf-8')).digest()
            code_challenge = base64.urlsafe_b64encode(code_challenge).decode('utf-8').replace('=', '')

            result = {
                'code_verifier': code_verifier,
                'code_challenge': code_challenge
            }

            cache.set('code_challenge', result, timeout=5 * 60)  # Cache for 5 minutes

        return Response(result)
