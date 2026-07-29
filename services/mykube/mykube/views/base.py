from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework.response import Response


# @method_decorator(cache_page(2 * 60), name='dispatch')
class HomeView(TemplateView):
    template_name = 'home.html'


@api_view(http_method_names=['get'])
def test_endpoint(request):
    return Response({'status': True})
