from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from educativa.models import Competence
from educativa.serializers import CompetenceSerializer
from educativa.filters import CompetenceFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter,SearchFilter


class CompetenceViewSet(ModelViewSet):
    queryset = Competence.objects.order_by('id')
    serializer_class = CompetenceSerializer
    pagination_class = CustomPagination
    filterset_class = CompetenceFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['name','code']
    ordering_fields = ['id','course__id']
    ordering = ['id']