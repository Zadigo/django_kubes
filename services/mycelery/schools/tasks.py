from celery import shared_task
import requests


@shared_task
def run_complicated_task():
    response = requests.get('http://example.com')
    if response.ok:
        return {'content': response.content}
    return {'content': ''}
