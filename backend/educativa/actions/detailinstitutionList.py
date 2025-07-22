from educativa.models import  DetailInstitution
from educativa.serializers import  DetailInstitutionListSerializer
from rest_framework import status
from rest_framework.response import Response


def detailinstitution_list(self, request):
    try: 
        # Aplicar filtros según la solicitud GET
        queryset = DetailInstitution.objects.order_by('id')
        filtered_queryset = self.filter_queryset(queryset)

        paginator = self.pagination_class()
        # Paginar los resultados
        paginated_queryset = paginator.paginate_queryset(filtered_queryset, request)
        
        # Serializar los datos paginados
        serializer = DetailInstitutionListSerializer(paginated_queryset, many=True)

        # Devolver la respuesta paginada
        return paginator.get_paginated_response(serializer.data)
        
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
