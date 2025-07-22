from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import DetailInstitution
from educativa.serializers import DetailInstitutionSerializer
from educativa.filters import DetailInstitutionFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.decorators import action
from educativa.actions import detailinstitution_list, complete_code_modular, generate_account, delete_account



class DetailInstitutionViewSet(ModelViewSet):
    queryset = DetailInstitution.objects.order_by('id')
    serializer_class = DetailInstitutionSerializer
    pagination_class = CustomPagination
    filterset_class = DetailInstitutionFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    ordering_fields = ['id','area__id','institution__id','level__id','category__id','director__id']
    ordering = ['id']
    search_fields = ['institution__name','local_code','modular_code','director__person__name','director__person__last_name','director__person__num_document']

    
    @action(detail=False, methods=['get'])
    def detailinstitution_list(self, request):
        response = detailinstitution_list(self, request)
        return response
    
    @action(detail=False, methods=['get'])
    def complete_code_modular(self, request):
        response = complete_code_modular(self, request)
        return response
    
    @action(detail=False, methods=['get'])
    def generate_account(self, request):
        response = generate_account(self, request)
        return response
    
    @action(detail=False, methods=['get'])
    def delete_account(self, request):
        response = delete_account(self, request)
        return response