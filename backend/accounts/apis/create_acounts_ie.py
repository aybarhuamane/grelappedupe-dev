from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User, Group
from educativa.models import DetailInstitution
from django.core.paginator import Paginator
from django.db import transaction
import logging

logger = logging.getLogger(__name__)  # Para manejo de logs


class create_acounts_ie(APIView):
    def get(self, request):
        try:
            # Filtramos las instituciones que no tienen usuario asociado y cuyo nombre no contiene 'anexo'
            detail_institution = DetailInstitution.objects.exclude(institution__name__icontains='anexo')
            paginator = Paginator(detail_institution, 200)  # Procesar en lotes de 200
            page_number = request.GET.get('page', 1)
            page = paginator.page(page_number)
            
            user_new = 0
            user_exist = 0
            
            # Transacción atómica para garantizar la consistencia en la base de datos
            with transaction.atomic():
                group, _ = Group.objects.get_or_create(name='USERIE')  # Obtener el grupo una sola vez

                institutions_to_update = []

                for institution in page:
                    if institution.user is None:  # Si la institución no tiene usuario
                        # Verificar si el usuario ya existe
                        user, created = User.objects.get_or_create(
                            username=institution.modular_code,
                            defaults={
                                'email': f"{institution.modular_code}@gmail.com",
                                'password': institution.modular_code,
                                'first_name': institution.institution.name
                            }
                        )

                        if created:
                            # Usuario nuevo
                            user.groups.add(group)  # Asignar el grupo
                            institution.user = user  # Asignar el usuario a la institución
                            user_new += 1
                        else:
                            # Usuario existente
                            user_exist += 1

                        institutions_to_update.append(institution)

                # Guardar todas las instituciones actualizadas en una sola operación
                DetailInstitution.objects.bulk_update(institutions_to_update, ['user'])

            return Response(
                {"message": f"Usuarios creados: {user_new}, Usuarios existentes: {user_exist}"},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            logger.error(f"Error al crear cuentas: {str(e)}")  # Logging del error
            return Response(
                {"detail": "Ocurrió un error al crear las cuentas.", "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
