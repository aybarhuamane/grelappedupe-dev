from educativa.models import Director, DetailInstitution
from educativa.serializers import DirectorListSerializer, DetailInstitutionSerializer
from rest_framework.response import Response
from rest_framework import status

def director_list(self, request):
    try: 
        # Aplicar filtros según la solicitud GET
        queryset = Director.objects.order_by('id')
        filtered_queryset = self.filter_queryset(queryset)
        data = []
        paginator = self.pagination_class()
        # Paginar los resultados
        paginated_queryset = paginator.paginate_queryset(filtered_queryset, request)
        
        #listar las instituciones asociadas a un director
        for director in paginated_queryset:
            queryset_institution = DetailInstitution.objects.filter(director=director)
            data.append({
                'director': DirectorListSerializer(director).data,
                'institutions': DetailInstitutionSerializer(queryset_institution, many=True).data
            })
        # Devolver la respuesta paginada
        return paginator.get_paginated_response(data)
        
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
