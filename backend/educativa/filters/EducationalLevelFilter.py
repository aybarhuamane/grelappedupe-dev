from django_filters import rest_framework as filters
from educativa.models import EducationalLevel


class EducationalLevelFilter(filters.FilterSet):
    class Meta:
        model = EducationalLevel
        fields = {
            'name': ['icontains'],
            'modality__id':['exact'],
            'modality__name': ['icontains','exact'],
            'is_active': ['exact']
        }