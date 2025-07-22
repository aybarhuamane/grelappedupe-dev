from rest_framework import serializers
from educativa.models import Teaching
from core.serializers.PersonSerializer import PersonSerializer


class TeachingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teaching
        fields = '__all__'


class TeachingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teaching
        fields = '__all__'
        depth = 2
