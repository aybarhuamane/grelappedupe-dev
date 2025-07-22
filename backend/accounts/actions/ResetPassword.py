from django.contrib.auth.models import User
from core.models import Person
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist


@transaction.atomic
def reset_password(self,request):
    try:
        person_id = request.data.get('person_id')
        if not person_id:
            return Response({'message': 'La persona es requerido.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            person = Person.objects.get(id=person_id)
        except ObjectDoesNotExist:
            return Response({'message': 'La persona con el ID proporcionado no existe.'}, status=status.HTTP_404_NOT_FOUND)
        user_id = person.user.id
        password = person.num_document
        try:
            user = User.objects.get(id=user_id)
            user.set_password(password)
            user.save()
            return Response({'message': 'Contraseña Reseteada exitosamente.'}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'message': 'El usuario  proporcionado no existe.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({'message': 'Ocurrió un error inesperado.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)