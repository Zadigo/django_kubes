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
        client_id="testclientid",
        client_secret="testclientsecret",
        client_type=Application.CLIENT_CONFIDENTIAL,
        authorization_grant_type=Application.GRANT_PASSWORD,
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
    response = client.post(
        '/o/token/', 
        {
            'grant_type': 'password',
            'username': user.username,
            'password': 'testpass'
        },
        HTTP_AUTHORIZATION=f'Basic {oauth_client.client_id}:{oauth_client.client_secret}',
    )

    data = response.json()
    assert 'error' not in data
    print(response.json())
