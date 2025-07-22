from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import CourseAssignment
from educativa.serializers import CourseAssignmentSerializer
from educativa.filters import CourseAssignmentFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class CourseAssignmentViewSet(ModelViewSet):
    queryset = CourseAssignment.objects.order_by('id')
    serializer_class = CourseAssignmentSerializer
    pagination_class = CustomPagination
    filterset_class = CourseAssignmentFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','is_active','is_validated']
    ordering = ['id']