from rest_framework import serializers
from educativa.models import Director


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'


class DirectorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'
        depth = 1