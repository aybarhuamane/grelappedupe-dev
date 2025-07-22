from django_filters import rest_framework as filters
from educativa.models import Competence


class CompetenceFilter(filters.FilterSet):
    class Meta:
        model = Competence
        fields = {
            'id': ['exact'],
            'name': ['exact', 'icontains'],
            'course__id': ['exact'],
            'course__name':['exact', 'icontains'],
            'is_active': ['exact'],
        }
