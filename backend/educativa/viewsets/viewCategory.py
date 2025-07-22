from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import Category
from educativa.serializers import CategorySerializer
from educativa.filters import CategoryFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.order_by('id')
    serializer_class = CategorySerializer
    pagination_class = CustomPagination
    filterset_class = CategoryFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','is_active']
    ordering = ['id']