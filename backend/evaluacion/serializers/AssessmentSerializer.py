from rest_framework import serializers
from evaluacion.models import Assessment
from rest_framework_bulk import (
    BulkSerializerMixin,
    BulkListSerializer,
)


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'
    
    

class AssessmentBulkSerializer(BulkSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'
        list_serializer_class = BulkListSerializer



class AssessmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'
        depth = 4