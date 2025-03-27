from rest_framework.test import APITestCase
from django.urls import reverse


class TestApiEndpoints(APITestCase):
    def test_list_schools(self):
        path = reverse('schools_api:list')
        response = self.client.get(path)
        print(response.content)
        self.assertEqual(response.status_code, 200)
