import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mykube.settings')

app = Celery('mykube', broker="amqp://guest:guest@localhost:5672//", backend=settings.REDIS_URL)
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
