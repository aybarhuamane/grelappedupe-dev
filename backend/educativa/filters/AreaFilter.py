from django_filters import rest_framework as filters
from educativa.models import Area


class AreaFilter(filters.FilterSet):
    class Meta:
        model = Area
        fields = {
            'name': ['icontains'],
            'is_active': ['exact']
        }