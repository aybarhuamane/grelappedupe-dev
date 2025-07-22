from django_filters import rest_framework as filters
from educativa.models import Institution


class InstitucionFilter(filters.FilterSet):
    class Meta:
        model = Institution
        fields = {
            'id': ['exact'],
            'name': ['icontains'],
            'ubigeo__id': ['exact'],
            'ubigeo__region':['icontains','exact'],
            'ubigeo__province':['icontains','exact'],
            'ubigeo__district':['icontains','exact'],
        }