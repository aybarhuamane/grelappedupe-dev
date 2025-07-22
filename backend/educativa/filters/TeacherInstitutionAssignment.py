from django_filters import rest_framework as filters
from educativa.models import TeacherInstitutionAssignment


class TeacherInstitutionAssignmentFilter(filters.FilterSet):
    class Meta:
        model = TeacherInstitutionAssignment
        fields = {
            'id': ['exact'],
            'teaching': ['exact'],
            'detail_institution': ['exact'],
            'is_active': ['exact'],
            'teaching__person__num_document': ['exact', 'icontains'],
            'teaching__person__name': ['exact', 'icontains'],
            'teaching__person__last_name': ['exact', 'icontains'],
            'detail_institution__modular_code': ['exact', 'icontains'],
        }