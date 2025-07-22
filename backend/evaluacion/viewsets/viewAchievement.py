from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from evaluacion.models import Achievement
from evaluacion.serializers import AchievementSerializer
from evaluacion.filters import AchievementFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter



class AchievementViewSet(ModelViewSet):
    queryset = Achievement.objects.order_by('id')
    serializer_class = AchievementSerializer
    pagination_class = CustomPagination
    filterset_class = AchievementFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','name', 'is_active']
    ordering = ['id']