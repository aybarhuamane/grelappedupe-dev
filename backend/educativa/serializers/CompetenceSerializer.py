from rest_framework import serializers
from educativa.models import Competence


class CompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competence
        fields = '__all__'