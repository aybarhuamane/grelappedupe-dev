from django_filters import rest_framework as filters
from educativa.models import DetailInstitution

class DetailInstitutionFilter(filters.FilterSet):
    class Meta:
        model = DetailInstitution
        fields = {
            'id':['exact'],
            'institution__id':['exact'],
            'institution__name':['exact','icontains'],
            'director__person__id':['exact'],
            'local_code':['exact', 'icontains'],
            'modular_code':['exact', 'icontains'],
            'level__id':['exact'],
            'level__name':['exact','icontains'],
            'level__modality__id':['exact'],
            'category__id': ['exact'],
            'area_id': ['exact'],

        }

