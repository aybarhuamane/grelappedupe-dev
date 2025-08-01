from django_filters import rest_framework as filters
from educativa.models import Category


class CategoryFilter(filters.FilterSet):
    class Meta:
        model = Category
        fields = {
            'name': ['icontains'],
            'is_active': ['exact'],
        }