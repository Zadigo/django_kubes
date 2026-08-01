from rest_framework import serializers


class CodeChallengeSerializer(serializers.Serializer):
    code_verifier = serializers.CharField(max_length=128, required=True)
    code_challenge = serializers.CharField(max_length=128, required=True)
    # code_challenge_method = serializers.ChoiceField(choices=['plain', 'S256'], required=True)
