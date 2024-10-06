from django.views.generic import TemplateView

from mycelery.tasks import add


class HomeView(TemplateView):
    template_name = 'home.html'
