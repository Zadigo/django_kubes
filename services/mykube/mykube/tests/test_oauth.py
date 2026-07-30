import base64

import pytest
from django.contrib.auth import get_user_model
from django.test.client import Client
from faker import Faker
from oauth2_provider.models import Application

faker = Faker()


@pytest.fixture
def oauth_client():
    return Application.objects.create(
        name="Test Application",
        client_type=Application.CLIENT_CONFIDENTIAL,
        authorization_grant_type=Application.GRANT_CLIENT_CREDENTIALS,
        redirect_uris="http://localhost",
    )

@pytest.fixture
def user():
    model = get_user_model()
    user = model.objects.create_user(username='testuser', password='testpass')
    user.is_active = True
    user.is_staff = True
    user.is_superuser = True
    user.save()
    return user


@pytest.mark.django_db
def test_django_oauth2_backend(user, oauth_client):
    client = Client()

    oauth_client.user = user
    oauth_client.save()

    credentials = f'{oauth_client.client_id}:{oauth_client.client_secret}'
    b64_credentials = base64.b64encode(credentials.encode('utf-8'))

    response = client.post(
        '/o/token/', 
        data={
            'grant_type': 'client_credentials',
        },
        content_type='application/x-www-form-urlencoded',
        HTTP_CACHE_CONTROL='no-cache',
        HTTP_AUTHORIZATION=f'Basic {b64_credentials.decode()}'
    )

    data = response.json()
    assert 'error' not in data
    print(response.json())
