from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import TeacherInstitutionAssignment
from educativa.serializers import TeacherInstitutionAssignmentSerializer
from educativa.filters import TeacherInstitutionAssignmentFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response
from rest_framework import status
from educativa.actions import asignar_teacher, teacherinstitutionassignment_list
from rest_framework.decorators import action

class TeacherInstitutionAssignmentViewSet(ModelViewSet):
    queryset = TeacherInstitutionAssignment.objects.order_by('id')
    serializer_class = TeacherInstitutionAssignmentSerializer
    pagination_class = CustomPagination
    filterset_class = TeacherInstitutionAssignmentFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    ordering_fields = ['id', 'teaching', 'detail_institution', 'is_active']
    ordering = ['id']
    search_fields = ['teaching__person__name', 'teaching__person__last_name', 'teaching__person__num_document']

    #cuando creo un nuevo registro no debe existir 2 registros con el mismo teacher y detail_institution si esta activo si no esta activo solo se activa mas no registra

    def create(self, request, *args, **kwargs):
        data = request.data
        queryset = TeacherInstitutionAssignment.objects.filter(teaching=data['teaching'], detail_institution=data['detail_institution'])
        if queryset.exists() and queryset.first().is_active:
            return Response({'message': 'El docente ya esta asignado a esta institucion'}, status=status.HTTP_400_BAD_REQUEST)
        
        if queryset.exists() and not queryset.first().is_active:
            queryset.first().is_active = True
            queryset.first().save()
            return Response({'message': 'El docente ha sido asignado a la institucion'}, status=status.HTTP_200_OK)
        return super(TeacherInstitutionAssignmentViewSet, self).create(request, *args, **kwargs)
    
    @action(detail=False, methods=['post'])
    def asignar_teacher(self, request):
        response = asignar_teacher(self, request)
        return response
    
    @action(detail=False, methods=['get'])
    def teacher_list(self, request):
        response = teacherinstitutionassignment_list(self, request)
        return response