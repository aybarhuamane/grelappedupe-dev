from django_filters import rest_framework as filters
from educativa.models import Course


class CourseFilter(filters.FilterSet):
    class Meta:
        model = Course
        fields = {
            'id': ['exact'],
            'name': ['exact', 'icontains'],
            'is_active': ['exact'],
        }