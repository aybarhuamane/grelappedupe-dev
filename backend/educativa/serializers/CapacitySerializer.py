from rest_framework import serializers
from educativa.models import Capacity


class CapacitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Capacity
        fields = '__all__'


class CapacityListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capacity
        fields = '__all__'
        depth = 1