from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import Student
from educativa.serializers import StudentSerializer
from educativa.filters import StudentFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class StudentViewSet(ModelViewSet):
    queryset = Student.objects.order_by('id')
    serializer_class = StudentSerializer
    pagination_class = CustomPagination
    filterset_class = StudentFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','num_document']
    ordering = ['id']

    