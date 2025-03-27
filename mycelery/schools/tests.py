from channels.routing import URLRouter
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings
from django.urls import re_path, reverse
from rest_framework.test import APITestCase
from schools import consumers, tasks


class AuthenticationMixin(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = get_user_model().objects.first()
        cls.user.set_password('touparet')
        cls.user.save()

    def setUp(self):
        self.client = self.client_class()
        self.token = self._authenticate()

    def _authenticate(self):
        response = self.client.post(
            reverse('token_obtain'),
            data={
                'username': self.user.username,
                'password': 'touparet'
            }
        )

        self.assertEqual(response.status_code, 200, response.content)

        token = response.json().get('access')
        self.assertIsNotNone(token, 'Token retrieval failed')

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
        return token


class TestApiEndpoints(AuthenticationMixin):
    fixtures = ['fixtures/users']

    def test_list_schools(self):
        path = reverse('schools_api:list')
        response = self.client.get(path)
        self.assertEqual(response.status_code, 200, response.content)

        for item in response.json():
            with self.subTest(item=item):
                self.assertIn('objectid', item)


class TestWebsocketEndpoints(TestCase):
    def setUp(self):
        self.app = URLRouter([
            re_path(
                r'^ws/schools$',
                consumers.SchoolEndpoint.as_asgi()
            )
        ])

    async def create_connection(self):
        instance = WebsocketCommunicator(self.app, '/ws/schools')
        state, _ = await instance.connect()
        self.assertTrue(state)

        response = await instance.receive_json_from()
        self.assertIn('action', response)
        return instance

    # async def test_connection(self):
    #     instance = await self.create_connection()
    #     await instance.disconnect()

    async def test_get_schools_endpoint(self):
        instance = await self.create_connection()

        # Start
        await instance.send_json_to({'action': 'test'})
        response = await instance.receive_json_from()
        self.assertIn('action', response)

        # Anoter test
        await instance.send_json_to({'action': 'test'})
        response = await instance.receive_json_from()
        self.assertIn('action', response)

        await instance.disconnect()


@override_settings(CELERY_TASK_ALWAYS_EAGER=True, CELERY_TASK_EAGER_PROPAGATES=True)
class TestTasks(TestCase):
    fixtures = ['fixtures/users']

    def test_complicated_task(self):
        t1 = tasks.run_complicated_task.apply()
        result = t1.get()
        self.assertIn('content', result)
