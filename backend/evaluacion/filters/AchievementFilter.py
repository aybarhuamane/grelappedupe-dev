from django_filters import rest_framework as filters
from evaluacion.models import Achievement


class AchievementFilter(filters.FilterSet):
    class Meta:
        model = Achievement
        fields = {
            'id': ['exact'],
            'name': ['exact','icontains'],
            'is_active':['exact']
        }
