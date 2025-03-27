from rest_framework.permissions import IsAuthenticated
import requests
from django.core.cache import cache
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import Response
from schools.api import serializers


class ListSchools(GenericAPIView):
    serializer_class = serializers.SchoolSerializer
    api_url = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-colleges-and-universities/records'

    def send_request(self) -> dict[str, str | list]:
        headers = {'user-agent': 'Django/5'}
        response = requests.get(self.api_url, headers=headers)
        if response.ok:
            return response.json()
        return []

    def get_queryset(self):
        data = cache.get('schools', None)
        if data is None:
            data = self.send_request().get('results', [])
            cache.set('schools', data, 2 * 60)
        return data

    def get(self, request, *args, **kwargs):
        data = self.get_queryset()
        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)


class School(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({'status': True})
