from rest_framework import serializers
from educativa.models import Institution


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'

class InstitutionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'
        depth = 1