from django.contrib.auth.models import User
from accounts.serializers import ModifyPasswordSerializer
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction


@transaction.atomic
def modify_password(self,request):
    try:
        serializer = ModifyPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'message': 'Error al enviar datos.', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        user_id = serializer.validated_data.get('user_id')
        password = serializer.validated_data.get('password')
        confirm_password = serializer.validated_data.get('confirm_password')

        if password != confirm_password:
            return Response({'message': 'Las contraseñas no coinciden.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.get(id=user_id)
        user.set_password(password)
        user.save()
        
        return Response({'message': 'Contraseña actualizada exitosamente.'}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'message': 'Ocurrió un error inesperado.', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)