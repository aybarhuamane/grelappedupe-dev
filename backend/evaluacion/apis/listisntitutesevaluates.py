from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.pagination import CustomPagination
from educativa.models import DetailInstitution
from educativa.serializers import DetailInstitutionSerializerEvaluation
from evaluacion.models import Assessment
from django.db.models import Exists, OuterRef, Count, Subquery, Case, When, Value, F

class ListInstitutesEvaluates(APIView):
    def get(self, request):
        try:
            # Obtener parámetros de consulta
            drel = request.GET.get("drel")
            ugel = request.GET.get("ugel")
            distrito = request.GET.get("distrito")
            codigo_local = request.GET.get("codigo_local")
            codigo_modular = request.GET.get("codigo_modular")
            colegio_nombre = request.GET.get("colegio_nombre")
            evaluacion_v = request.GET.get("evaluacion")
            period_id = request.GET.get("period_id")

            # Construir el diccionario de filtros dinámicamente
            filters_colegio = {}
            if drel:
                filters_colegio["institution__ubigeo__region"] = drel
            if ugel:
                filters_colegio["institution__ubigeo__province"] = ugel
            if distrito:
                filters_colegio["institution__ubigeo__district"] = distrito
            if codigo_local:
                filters_colegio["local_code__icontains"] = codigo_local
            if codigo_modular:
                filters_colegio["modular_code__icontains"] = codigo_modular
            if colegio_nombre:
                filters_colegio["institution__name__icontains"] = colegio_nombre

            filters_assessment = {}
            if period_id:
                filters_assessment["period_id"] = period_id

            # Consultas para obtener la cantidad de evaluaciones y cuántas son válidas
            total_evaluaciones = Assessment.objects.filter(
                course_assignment__degree__detail_institution=OuterRef('pk'),
                **filters_assessment
            ).values('course_assignment__degree__detail_institution').annotate(
                total=Count('id')
            )

            evaluaciones_validas = Assessment.objects.filter(
                course_assignment__degree__detail_institution=OuterRef('pk'),
                course_assignment__is_validated=True,
                **filters_assessment
            ).values('course_assignment__degree__detail_institution').annotate(
                validas=Count('id')
            )

            # Aplicar filtros y anotaciones
            colegio = DetailInstitution.objects.filter(**filters_colegio).annotate(
                total_evaluaciones=Subquery(total_evaluaciones.values('total')),
                evaluaciones_validas=Subquery(evaluaciones_validas.values('validas')),

                # Determinar el estado de evaluación
                evaluacion=Case(
                    When(total_evaluaciones__isnull=True, then=Value('no evaluado')),
                    When(total_evaluaciones=F('evaluaciones_validas'), then=Value('evaluado')),
                    When(total_evaluaciones__gt=F('evaluaciones_validas'), then=Value('en proceso')),
                    default=Value('no evaluado')
                )
            ).order_by('institution__name')

            # Filtrar por el estado de evaluación si es necesario
            if evaluacion_v:
                if evaluacion_v == 'evaluado':
                    colegio = colegio.filter(evaluacion='evaluado')
                elif evaluacion_v == 'en proceso':
                    colegio = colegio.filter(evaluacion='en proceso')
                elif evaluacion_v == 'no evaluado':
                    colegio = colegio.filter(evaluacion='no evaluado')

            # Paginación y serialización del resultado
            paginator = CustomPagination()
            colegio_data = paginator.paginate_queryset(colegio, request)

            # Serializar el resultado
            serializer = DetailInstitutionSerializerEvaluation(colegio_data, many=True)

            # Paginación
            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        