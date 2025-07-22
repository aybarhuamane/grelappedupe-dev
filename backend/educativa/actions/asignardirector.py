from educativa.models import  DetailInstitution, Director, Person
from django.contrib.auth.models import Group
from rest_framework import status
from django.db import transaction
from rest_framework.response import Response

@transaction.atomic
def asignar_director(self,request):
    try:
        person = request.data.get('person')
        person = Person.objects.get(pk=person)
        director, created = Director.objects.get_or_create(person=person)
        director.save()
        
        # Verificar si la persona tiene un usuario asociado
        if person.user:
            user = person.user
            #verificar si el usuario ya tiene el grupo DOCENTE
            if user.groups.filter(name='DIRECTOR').exists():
                pass
            else:
                # Obtener o crear el grupo "DOCENTE"
                group, created = Group.objects.get_or_create(name='DIRECTOR')

                # 
                user.groups.add(group)
                
                # Opcionalmente, puedes guardar el usuario si es necesario
                user.save()

            # Asignar a institución
            detailinstitution = request.data.get('detailinstitution')
            detailinstitution = DetailInstitution.objects.get(pk=detailinstitution)

            # # Verificar si ya existe un registro con el mismo 
            # if DetailInstitution.objects.filter(director=director).exists():
            #     return Response({"message": "El director ya está asignado a otra institución."}, status=400)

            # Si no existe, asignar el director y guardar
            detailinstitution.director = director
            detailinstitution.save()

        return Response({
            'message': 'Director asignado correctamente'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(e)
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)