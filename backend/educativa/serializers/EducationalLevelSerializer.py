from rest_framework import serializers
from educativa.models import EducationalLevel


class EducationalLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalLevel
        fields = '__all__'