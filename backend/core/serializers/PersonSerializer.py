from rest_framework import serializers
from core.models import Person


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'


class PersonSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = "__all__"
        depth = 2
