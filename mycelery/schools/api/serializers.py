
from rest_framework.serializers import Serializer
from rest_framework import fields


class SchoolSerializer(Serializer):
    objectid = fields.CharField()
    name = fields.CharField()
    state = fields.CharField()
    website = fields.URLField()
