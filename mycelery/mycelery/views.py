from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView


@method_decorator(cache_page(2 * 60), name='dispatch')
class HomeView(TemplateView):
    template_name = 'home.html'
