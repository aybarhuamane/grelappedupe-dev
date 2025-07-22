from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from evaluacion.models import Answer
from evaluacion.serializers import AnswerSerializer
from evaluacion.filters import AnswerFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.order_by('id')
    serializer_class = AnswerSerializer
    pagination_class = CustomPagination
    filterset_class = AnswerFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','question__id', 'is_correct']
    ordering = ['id']