from rest_framework import serializers
from educativa.models import TeacherInstitutionAssignment


class TeacherInstitutionAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherInstitutionAssignment
        fields = '__all__'


class TeacherInstitutionAssignmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherInstitutionAssignment
        fields = '__all__'
        depth = 2