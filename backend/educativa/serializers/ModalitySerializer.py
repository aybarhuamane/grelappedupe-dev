from rest_framework import serializers
from educativa.models import Modality


class ModalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Modality
        fields = '__all__'