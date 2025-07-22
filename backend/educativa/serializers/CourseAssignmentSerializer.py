from rest_framework import serializers
from educativa.models import CourseAssignment


class CourseAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseAssignment
        fields = '__all__'


class CourseAssignmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseAssignment
        fields = '__all__'
        depth = 4