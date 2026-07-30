from celery import shared_task


@shared_task
def clear_tokens():
    """A Celery task to clear expired OAuth2 tokens."""
    from oauth2_provider.models import clear_expired

    clear_expired()
