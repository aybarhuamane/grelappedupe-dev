from django_filters import rest_framework as filters
from educativa.models import Capacity


class CapacityFilter(filters.FilterSet):
    class Meta:
        model = Capacity
        fields = {
            'id': ['exact'],
            'name': ['exact', 'icontains'],
            'is_active': ['exact'],
            'competence__id': ['exact'],
            'competence__course__id': ['exact'],
        }