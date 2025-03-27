
from rest_framework.serializers import Serializer
from rest_framework import fields


class SchoolSerializer(Serializer):
    name = fields.CharField()
    state = fields.CharField()
