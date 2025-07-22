from django_filters import rest_framework as filters
from educativa.models import Degree


class DegreeFilter(filters.FilterSet):
    class Meta:
        model = Degree
        fields = {
            'id':['exact'],
            'section':['exact','icontains'],
            'is_active':['exact'],
            'detail_institution__id':['exact'],
            'detail_institution__institution__id':['exact'],
            'degree_number': ['exact'],
        }