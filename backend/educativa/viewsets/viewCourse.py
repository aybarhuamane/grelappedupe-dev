from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import Course
from educativa.serializers import CourseSerializer
from educativa.filters import CourseFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter



class CourseViewSet(ModelViewSet):
    queryset = Course.objects.order_by('id')
    serializer_class = CourseSerializer
    pagination_class = CustomPagination
    filterset_class = CourseFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','is_active']
    ordering = ['id']