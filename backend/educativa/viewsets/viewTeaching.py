from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import Teaching
from educativa.serializers import TeachingSerializer
from educativa.filters import TeachingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django.contrib.auth.models import Group
from rest_framework.filters import SearchFilter
from educativa.actions import teaching_list
from rest_framework.decorators import action

class TeachingViewSet(ModelViewSet):
    queryset = Teaching.objects.order_by('id')
    serializer_class = TeachingSerializer
    pagination_class = CustomPagination
    filterset_class = TeachingFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    ordering_fields = ['id','is_active']
    ordering = ['id']
    search_fields = ['person__num_document', 'person__name', 'person__last_name']

    def perform_create(self, serializer):
        # Guardar el registro de docencia
        teaching = serializer.save()

        # Obtener la persona asociada al registro de docencia
        person = teaching.person  # Suponiendo que el modelo Teaching tiene un campo person que referencia a la persona
        
        if person.user:
            user = person.user
            #verificar si el usuario ya tiene el grupo DOCENTE
            if user.groups.filter(name='DOCENTE').exists():
                return
            else:
                # Obtener o crear el grupo "DOCENTE"
                group, created = Group.objects.get_or_create(name='DOCENTE')

                # 
                user.groups.add(group)
                
                # Opcionalmente, puedes guardar el usuario si es necesario
                user.save()

    @action(detail=False, methods=['get'])
    def teacher_list(self, request):
        response = teaching_list(self, request)
        return response
        