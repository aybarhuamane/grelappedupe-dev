from rest_framework import serializers
from educativa.models import DetailInstitution
from educativa.serializers.InstitutionSerializer import InstitutionSerializer
from educativa.serializers.DirectorSerializer import DirectorSerializer


class DetailInstitutionSerializer(serializers.ModelSerializer):
     class Meta:
        model = DetailInstitution
        fields = '__all__'

class DetailInstitutionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetailInstitution
        fields = '__all__'
        depth = 2

class DetailInstitutionSerializerEvaluation(serializers.ModelSerializer):
    evaluacion = serializers.CharField()
    class Meta:
        model = DetailInstitution
        fields = '__all__'
        depth = 4