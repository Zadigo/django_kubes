from django.views.generic import TemplateView

from mycelery.tasks import add


class HomeView(TemplateView):
    template_name = 'home.html'

    def dispatch(self, request, *args, **kwargs):
        add.apply_async((1, 1), countdown=5)
        return super().dispatch(request, *args, **kwargs)
