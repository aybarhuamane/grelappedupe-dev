from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from core.models import Ubigeo
from core.serializers import UbigeoSerializer

class region(APIView):
    def get(self, request):
        try:
            regiones = Ubigeo.objects.all().values("region").distinct()
            data = []
            for region in regiones:
                data.append({"region": region["region"]})
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class province(APIView):
    def get(self, request):
        try:
            region = request.GET.get("region")
            provincias = Ubigeo.objects.filter(region=region).exclude(province__isnull=True).values("province").distinct().order_by("province")
            data = []
            for provincia in provincias:
                data.append({"province": provincia["province"]})
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class district(APIView):
    def get(self, request):
        try:
            region = request.GET.get("region")
            provincia = request.GET.get("province")
            distritos = Ubigeo.objects.filter(region=region, province=provincia).exclude(district__isnull=True).values("district").distinct().order_by("district")
            data = []
            for distrito in distritos:
                data.append({"district": distrito["district"]})
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )