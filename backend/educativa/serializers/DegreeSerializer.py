from rest_framework import serializers
from educativa.models import Degree


class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = '__all__'