from educativa.models import Teaching
from educativa.serializers import TeachingListSerializer
from rest_framework.response import Response
from rest_framework import status

def teaching_list(self, request):
    try: 
        # Aplicar filtros según la solicitud GET
        queryset = Teaching.objects.order_by('id')
        filtered_queryset = self.filter_queryset(queryset)

        paginator = self.pagination_class()
        # Paginar los resultados
        paginated_queryset = paginator.paginate_queryset(filtered_queryset, request)

        # Serializar los datos paginados
        serializer = TeachingListSerializer(paginated_queryset, many=True)

        # Devolver la respuesta paginada
        return paginator.get_paginated_response(serializer.data)
        
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
