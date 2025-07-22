from django_filters import rest_framework as filters
from educativa.models import Director


class DirectorFilter(filters.FilterSet):
    class Meta:
        model = Director
        fields = {
            'person__id':['exact'],
            'person__name': ['icontains'],
            'person__last_name': ['icontains'],
            'person__num_document': ['icontains','exact'],
            'is_active': ['exact'],
        }
