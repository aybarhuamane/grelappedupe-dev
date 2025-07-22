from django_filters import rest_framework as filters
from core.models import Ubigeo


class UbigeoFilter(filters.FilterSet):
    class Meta:
        model = Ubigeo
        fields = {
            'code': ['exact'],
            'region': ['exact', 'icontains'],
            'province': ['exact'],
            'district': ['exact'],
        }