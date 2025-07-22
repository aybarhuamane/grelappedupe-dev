from educativa.models import  DetailInstitution, Person, Teaching, TeacherInstitutionAssignment
from django.contrib.auth.models import Group
from rest_framework import status
from django.db import transaction
from rest_framework.response import Response

@transaction.atomic
def asignar_teacher(self,request):
    try:
        person = request.data.get('person')
        person = Person.objects.get(pk=person)
        teaching , created = Teaching.objects.get_or_create(person=person)
        teaching .save()
        
        # Verificar si la persona tiene un usuario asociado
        if person.user:
            user = person.user
            #verificar si el usuario ya tiene el grupo DOCENTE
            if user.groups.filter(name='DOCENTE').exists():
                pass
            else:
                # Obtener o crear el grupo "DOCENTE"
                group, created = Group.objects.get_or_create(name='DOCENTE')

                # 
                user.groups.add(group)
                
                # Opcionalmente, puedes guardar el usuario si es necesario
                user.save()

            # Asignar a institución
            print(request.data)
            detailinstitution = request.data.get('detail_institution')
            detailinstitution = DetailInstitution.objects.get(pk=detailinstitution)

            # Verificar si ya existe un registro con el mismo DOCENTE
            if TeacherInstitutionAssignment.objects.filter(teaching=teaching, detail_institution=detailinstitution).exists():
                    return Response({"message": "El docente ya está asignado a esta institucion."}, status=400)

            else:
                # Crear la asignación
                teacher_institution_assignment = TeacherInstitutionAssignment(teaching=teaching, detail_institution=detailinstitution)
                teacher_institution_assignment.save()
                return Response({
                    'message': 'Docente asignado correctamente'
                }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)