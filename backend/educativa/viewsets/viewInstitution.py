from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import Institution
from educativa.serializers import InstitutionSerializer
from educativa.filters import InstitucionFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter,SearchFilter
from rest_framework.decorators import action
from educativa.actions import *



class InstitutionViewSet(ModelViewSet):
    queryset = Institution.objects.order_by('id')
    serializer_class = InstitutionSerializer
    pagination_class = CustomPagination
    filterset_class = InstitucionFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    ordering_fields = ['id','ubigeo__id']
    ordering = ['id']
    search_fields = ['name','address','ubigeo__region','ubigeo__province','ubigeo__district']

    @action(detail=False, methods=['get'])
    def institution_list(self, request):
        response = institution_list(self, request)
        return response