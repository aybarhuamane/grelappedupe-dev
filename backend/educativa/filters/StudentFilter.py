from django_filters import rest_framework as filters
from educativa.models import Student


class StudentFilter(filters.FilterSet):
    class Meta:
        model = Student
        fields = {
            'id': ['exact'],
            'name': ['exact','icontains'],
            'last_name': ['exact','icontains'],
            'num_document': ['exact','icontains'],
        }