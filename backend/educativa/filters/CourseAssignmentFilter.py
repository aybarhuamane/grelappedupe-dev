from django_filters import rest_framework as filters
from educativa.models import CourseAssignment


class CourseAssignmentFilter(filters.FilterSet):
    class Meta:
        model = CourseAssignment
        fields = {
            'id': ['exact'],
            'course__id': ['exact'],
            'degree__id':['exact'],
            'degree__detail_institution__id':['exact'],
            'teaching__id': ['exact'],
            'teaching__person__id': ['exact'],
            'date':['exact','gt','lt'],
            'is_active':['exact'],
            'is_validated':['exact'],
            'is_sent':['exact'],
        }
