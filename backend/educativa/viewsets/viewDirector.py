from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import Director
from educativa.serializers import DirectorSerializer
from educativa.filters import DirectorFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from django.contrib.auth.models import Group
from rest_framework.decorators import action
from educativa.actions import *



class DirectorViewSet(ModelViewSet):
    queryset = Director.objects.order_by('id')
    serializer_class = DirectorSerializer
    pagination_class = CustomPagination
    filterset_class = DirectorFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    ordering_fields = ['id','is_active']
    ordering = ['id']
    serach_fields = ['person__first_name', 'person__last_name', 'person__dni']

    

    @action(detail=False, methods=['get'])
    def director_list(self, request, pk=None):
        response = director_list(self, request)
        return response
    
    @action(detail=False, methods=['POST'])
    def asignar_director(self, request):
        response = asignar_director(self, request)
        return response