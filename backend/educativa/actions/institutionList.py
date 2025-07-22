from educativa.models import Institution, DetailInstitution,EducationalLevel
from educativa.serializers import InstitutionListSerializer, DetailInstitutionListSerializer, EducationalLevelSerializer
from rest_framework.response import Response
from rest_framework import status

def institution_list(self, request):
    try: 
        # Aplicar filtros según la solicitud GET
        queryset = Institution.objects.order_by('id')
        filtered_queryset = self.filter_queryset(queryset)

        paginator = self.pagination_class()
        # Paginar los resultados
        paginated_queryset = paginator.paginate_queryset(filtered_queryset, request)
        
        # Serializar los datos paginados
        serializer = InstitutionListSerializer(paginated_queryset, many=True)
         # Obtener los niveles educativos para cada institución
        for institution_data in serializer.data:
            institution_id = institution_data['id']
            # Obtener todos los DetailInstitution asociados a la institución
            detail_institutions = DetailInstitution.objects.filter(institution_id=institution_id)
            
            # Lista para almacenar los niveles educativos
            educational_levels = []
            
            # Recorrer cada DetailInstitution
            for detail_institution in detail_institutions:
                if detail_institution.level:  # Verificar si tiene un nivel educativo
                    educational_level_serializer = EducationalLevelSerializer(detail_institution.level)
                    educational_levels.append(educational_level_serializer.data)
            
            # Agregar los niveles educativos a la institución
            institution_data['educational_levels'] = educational_levels

        # Devolver la respuesta paginada
        return paginator.get_paginated_response(serializer.data)
        
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
