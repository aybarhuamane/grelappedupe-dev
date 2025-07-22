from django_filters import rest_framework as filters
from educativa.models import Modality


class ModalityFilter(filters.FilterSet):
    class Meta:
        model = Modality
        fields = {
            'name': ['icontains'],
            'is_active': ['exact']
        }
