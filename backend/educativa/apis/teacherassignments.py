from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from core.pagination import CustomPagination
from rest_framework.permissions import IsAuthenticated
from educativa.models import CourseAssignment
from educativa.serializers import CourseAssignmentListSerializer
from educativa.filters import CourseAssignmentFilter
from rest_framework.filters import OrderingFilter

class teacherassignmentsList(APIView):
    # permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = CourseAssignmentFilter
    ordering_fields = ['date', 'is_active']

    def get(self, request, *args, **kwargs):
        try:
            # Aplicar filtros según la solicitud GET
            queryset = CourseAssignment.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            
            # Paginar los resultados
            paginator = CustomPagination()
            paginated_queryset = paginator.paginate_queryset(filtered_queryset, request)
            serializer = CourseAssignmentListSerializer(paginated_queryset, many=True)
            return paginator.get_paginated_response(serializer.data)
        
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)