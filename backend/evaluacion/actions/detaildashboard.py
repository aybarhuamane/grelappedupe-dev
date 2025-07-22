from educativa.models import DetailInstitution
from evaluacion.models import Assessment
from rest_framework.response import Response
from rest_framework import status

def detail_dashboard(self, request):
    try:
        #devovler como dato numero de colegios, numero de evaluaciones, numero de evaluaciones que falta por registrar
        colegios = DetailInstitution.objects.order_by('id')

        #filtrar por lo colegios que tienen evaluaciones
        evaluaciones = Assessment.objects.filter(course_assignment__degree__detail_institution__id__in=colegios,course_assignment__is_validated=True).distinct("course_assignment__degree__detail_institution__id").count()
        evaluaciones_faltantes = colegios.count() - evaluaciones
        ultima_evaluacion = Assessment.objects.filter(course_assignment__degree__detail_institution__id__in=colegios).order_by("date").last()
        data=[]
        data.append({
            "colegios": colegios.count(),
            "evaluaciones": evaluaciones,
            "evaluaciones_faltantes": evaluaciones_faltantes,
            "ultima_evaluacion": ultima_evaluacion.date.strftime("%d/%m/%Y") if ultima_evaluacion and ultima_evaluacion.date else "sin registro"
        })
        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

