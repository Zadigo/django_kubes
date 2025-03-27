from django.views.generic import TemplateView
from django.views.decorators.cache import cache_control
from django.utils.decorators import method_decorator

class HomeView(TemplateView):
    template_name = 'home.html'
