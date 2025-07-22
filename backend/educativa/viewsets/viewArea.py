from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import Area
from educativa.serializers import AreaSerializer
from educativa.filters import AreaFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class AreaViewSet(ModelViewSet):
    queryset = Area.objects.order_by('id')
    serializer_class = AreaSerializer
    pagination_class = CustomPagination
    filterset_class = AreaFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','is_active']
    ordering = ['id']