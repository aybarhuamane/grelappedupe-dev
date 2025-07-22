from educativa.models import DetailInstitution
from django.contrib.auth.models import User
from educativa.serializers import  DetailInstitutionSerializer
from rest_framework.response import Response
from rest_framework import status

def complete_code_modular(self, request):
    try:
        #primero quiero sacar toda las listas de las instituciones
        queryset = DetailInstitution.objects.order_by('id')
        #con esto quiero verificar si el codigo modular tiene 7 digitos si no lo tiene lo relleno con ceros
        # y luego lo guardo en una lista
        #devolver en el response la cantidad de colegios que se han actualizado
        count = 0
        for institution in queryset:
            if len(str(institution.modular_code)) < 7:
                institution.modular_code = str(institution.modular_code).zfill(7)
                institution.save()
                count += 1
        
        return Response({
            'message': 'Codigo Modular Completado exitosamente!!!',
            'updated': count
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def generate_account(self, request):
    try:

        queryset = DetailInstitution.objects.order_by('id')
        count_created = 0
        #quiero sacar todas las instituciones que no tengan el campo user y crearlo
        for institution in queryset:
            user = User.objects.filter(username=institution.modular_code).first()
            institution_name = institution.institution.name.strip().lower()  # Normalizar nombre

            # Verificar condiciones antes de crear la cuenta
            if not institution.user and not user and institution_name != 'sin nombre' and 'anexo' not in institution_name:
                user = User.objects.create_user(
                    username=institution.modular_code,
                    password=institution.modular_code,
                    first_name=institution.institution.name,
                    last_name=institution.level.name,
                    email=f"{institution.institution.name.replace(' ', '').lower()}@gmail.com"
                )
                user.groups.add(4)  # Asignar al grupo USERIE
                institution.user = user
                institution.save()
                count_created += 1

        return Response({
            'message': 'Cuentas Generadas exitosamente!!!',
            'created': count_created,
        }, status=status.HTTP_200_OK)
        

    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

def delete_account(self, request):
    try:
        queryset = DetailInstitution.objects.order_by('id')
        count_deleted = 0
        #quiero sacar todas las instituciones que tengan el campo user  y eliminarlo
        for institution in queryset:
            if institution.user:
                institution.user.delete()
                institution.user = None
                institution.save()
                count_deleted += 1
        
        return Response({
            'message': 'Cuentas Eliminadas exitosamente!!!',
            'deleted': count_deleted,
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)