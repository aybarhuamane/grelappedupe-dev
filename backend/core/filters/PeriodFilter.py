from django_filters import rest_framework as filters
from core.models import Period


class PeriodFilter(filters.FilterSet):
    class Meta:
        model = Period
        fields = {
            'name': ['exact', 'icontains'],
            'start_date': ['exact', 'icontains', 'gte', 'lte'],
            'end_date': ['exact', 'icontains', 'gte', 'lte'],
            'is_active': ['exact'],
        }
