from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import Degree
from educativa.serializers import DegreeSerializer
from educativa.filters import DegreeFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class DegreeViewSet(ModelViewSet):
    queryset = Degree.objects.order_by('id')
    serializer_class = DegreeSerializer
    pagination_class = CustomPagination
    filterset_class = DegreeFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','is_active']
    ordering = ['id']