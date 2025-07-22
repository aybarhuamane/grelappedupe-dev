from core.models import Person
from core.serializers import PersonSerializerList
from rest_framework.response import Response
from rest_framework import status

def person_list(self, request):
    try: 
        queryset = Person.objects.order_by('id')
        filtered_queryset = self.filter_queryset(queryset)
         # Aplicar paginación
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(filtered_queryset, request)
        
        serializer = PersonSerializerList(paginated_queryset, many=True)
        
        # Devolver la respuesta paginada
        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
