from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import EducationalLevel
from educativa.serializers import EducationalLevelSerializer
from educativa.filters import EducationalLevelFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class EducationalLevelViewSet(ModelViewSet):
    queryset = EducationalLevel.objects.order_by('id')
    serializer_class = EducationalLevelSerializer
    pagination_class = CustomPagination
    filterset_class = EducationalLevelFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','is_active','modality__id']
    ordering = ['id']