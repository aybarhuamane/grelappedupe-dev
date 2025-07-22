from rest_framework.viewsets import ModelViewSet
from educativa.models import Capacity
from educativa.serializers import CapacitySerializer
from educativa.filters import CapacityFilter
from django_filters.rest_framework import DjangoFilterBackend 
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.decorators import action
from educativa.actions import capacitys_list


class CapacityViewSet(ModelViewSet):
    queryset = Capacity.objects.order_by('id')
    serializer_class = CapacitySerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter)
    filterset_class = CapacityFilter
    ordering_fields = ['id', 'is_active']
    ordering = ['id']
    search_fields = ['name', 'code', 'competence__code']
    

    @action(detail=False, methods=['get'])
    def capacitys_list(self, request):
        response = capacitys_list(self, request)
        return response