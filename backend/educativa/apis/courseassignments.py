from educativa.filters import CourseAssignmentFilter
from educativa.models import CourseAssignment
from educativa.serializers import CourseAssignmentListSerializer
from core.pagination import CustomPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

class courseassignmentList(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = CourseAssignmentFilter
    pagination_class = CustomPagination

    def get(self, request):
        try:
            # Aplicar filtros según la solicitud GET
            queryset = CourseAssignment.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs

            paginator = self.pagination_class()
            # Paginar los resultados
            paginated_queryset = paginator.paginate_queryset(filtered_queryset, request)

            # Serializar los datos paginados
            serializer = CourseAssignmentListSerializer(paginated_queryset, many=True)

            # Devolver la respuesta paginada
            return paginator.get_paginated_response(serializer.data)
        
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
