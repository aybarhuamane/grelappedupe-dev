from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import Modality
from educativa.serializers import ModalitySerializer
from educativa.filters import ModalityFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class ModalityViewSet(ModelViewSet):
    queryset = Modality.objects.order_by('id')
    serializer_class = ModalitySerializer
    pagination_class = CustomPagination
    filterset_class = ModalityFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','is_active']
    ordering = ['id']