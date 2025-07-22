from rest_framework.viewsets import ModelViewSet
from core.models import Period
from core.serializers import PeriodSerializer
from core.pagination import CustomPagination
from core.filters import PeriodFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class PeriodViewSet(ModelViewSet):
    queryset = Period.objects.order_by('id')
    serializer_class = PeriodSerializer
    pagination_class = CustomPagination
    filterset_class = PeriodFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','name', 'start_date', 'end_date', 'is_active']
    ordering = ['-id']

    def create(self, request, *args, **kwargs):
        Period.objects.all().update(is_active=False)
        return super().create(request, *args, **kwargs)
