from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Period, Ubigeo
from core.serializers import PeriodSerializer, UbigeoSerializer
from core.filters import PeriodFilter, UbigeoFilter
from django_filters.rest_framework import DjangoFilterBackend



class powerbiperiod(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = PeriodFilter
    def get(self, request):
        try:
            queryset = Period.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = PeriodSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
class powerbiubigeo(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = UbigeoFilter
    def get(self, request):
        try:
            queryset = Ubigeo.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = UbigeoSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)