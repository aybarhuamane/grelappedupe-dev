from rest_framework.viewsets import ModelViewSet
from core.models import Ubigeo
from core.serializers import UbigeoSerializer
from core.pagination import CustomPagination
from core.filters import UbigeoFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class UbigeoViewSet(ModelViewSet):
    queryset = Ubigeo.objects.order_by('id')
    serializer_class = UbigeoSerializer
    pagination_class = CustomPagination
    filterset_class = UbigeoFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','code', 'region', 'province', 'district']
    ordering = ['id']
