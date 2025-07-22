from rest_framework.viewsets import ModelViewSet
from core.models import Person
from core.serializers import PersonSerializer
from core.pagination import CustomPagination
from core.filters import PersonFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from django.contrib.auth.models import User
from rest_framework.decorators import action
from core.action import *
from django.contrib.auth.hashers import make_password
from django.db import transaction


class PersonViewSet(ModelViewSet):
    queryset = Person.objects.order_by('id')
    serializer_class = PersonSerializer
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_class = PersonFilter
    ordering_fields = ['id','name', 'last_name', 'num_document', 'email', 'phone']
    ordering = ['id']
    search_fields = ['name', 'last_name', 'num_document']

    @transaction.atomic
    def perform_create(self, serializer):
        # Guardar la persona primero
        person = serializer.save()
        
        # Generar un nombre de usuario y contraseña usando el número de DNI
        username = person.num_document
        password = person.num_document
        #verificar si el usuario ya existe asignado a la persona
        if User.objects.filter(username=username).exists():
            person.user = User.objects.get(username=username)
            person.save()
            return
        else:
            # Crear el usuario asociado
            user = User.objects.create_user(
                username=username,
                password=password,
                first_name=person.name,
                last_name=person.last_name,
                email=person.email
            )
            # asignar el grupo que llega en el request
            groups = self.request.data.get('groups') 
            if groups is not None:
                for g in groups:
                    user.groups.add(g)
                user.save()

            if hasattr(person, 'user'):
                person.user = user
                person.save()
            else:
                pass

    def update(self, request, *args, **kwargs):
       # 1. Guardamos la PK para re-consultar después
        pk = kwargs.get('pk')
        
        # 2. Ejecutamos el update original
        response = super().update(request, *args, **kwargs)
        
        instance = instance = self.get_object()

        user = User.objects.filter(id=instance.user.id).first()
        if not user:
            # Si no tiene usuario, crearlo con su número de documento
            user = User.objects.create_user(
                username=instance.num_document,
                password=instance.num_document,
                first_name=instance.name,
                last_name=instance.last_name,
                email=instance.email
            )
            instance.user = user
            instance.save()
        else:
            # Si ya tiene usuario, actualizar sus datos
            user.username = instance.num_document
            user.set_password(instance.num_document)
            user.first_name = instance.name
            user.last_name = instance.last_name
            user.email = instance.email
            user.save()

        # # Si en el request llegan nuevos grupos, actualizarlos
        groups = request.data.get('groups', None)
        if groups is not None:
            user.groups.clear()  # Eliminar los grupos actuales
            for g in groups:
                user.groups.add(g)  # Agregar los nuevos grupos
            user.save()
        
        return response
    
    @action(detail=False, methods=['get'], url_path='person-list')
    def list_person(self, request):
        response = person_list(self, request)
        return response
    
    @action(detail=False, methods=['post'], url_path='import-person')
    def import_person(self, request):
        response = import_person(self, request)
        return response
    
    @action(detail=False, methods=['get'], url_path='get-person')
    def get_person(self, request):
        response = get_person(self, request)
        return response