from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from educativa.models import DetailInstitution,  Course, Competence, Capacity
from evaluacion.models import Achievement, Assessment
from evaluacion.serializers import AchievementSerializer, AssessmentSerializer
from django.db.models import Sum

class dashboard(APIView):
    def get(self, request):
        try:# Obtener los parámetros de la solicitud
            drel = request.GET.get("drel")
            ugel = request.GET.get("ugel")
            distrito = request.GET.get("distrito")
            codigo_local = request.GET.get("codigo_local")
            codigo_modular = request.GET.get("codigo_modular")
            period_id = request.GET.get("period_id")
            curso_id = request.GET.get("curso_id")
            competencia_id = request.GET.get("competencia_id")


            # Construir el diccionario de filtros dinámicamente
            filters_colegio = {}
            if drel:
                filters_colegio["institution__ubigeo__region"] = drel
            if ugel:
                filters_colegio["institution__ubigeo__province"] = ugel
            if distrito:
                filters_colegio["institution__ubigeo__district"] = distrito
            if codigo_local:
                filters_colegio["local_code"] = codigo_local
            if codigo_modular:
                filters_colegio["modular_code"] = codigo_modular

            filters_evaluacion = {}

            if period_id:
                filters_evaluacion["period_id"] = period_id

            if not curso_id:
                return Response(
                    {
                        "detail": "El parámetro curso_id es requerido."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            colegios = DetailInstitution.objects.filter(**filters_colegio)

            if not colegios.exists():
                return Response(
                    {
                        "detail": "No se encontraron colegios con los filtros proporcionados."
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            data = []
            data_competencia = []
            data_capacidad = []
            cursos = Course.objects.filter(id=curso_id)
            logros = Achievement.objects.all()
            # logros_serializer = AchievementSerializer(logros, many=True)


            for curso in cursos:
                if competencia_id:
                    competencias = Competence.objects.get(id=competencia_id, course=curso)
                    #sacar las capacidades de la competencia
                    capacidades = Capacity.objects.filter(competence=competencias)
                    for capacidad in capacidades:
                        evaluaciones = Assessment.objects.filter(
                            question__capacity__id=capacidad.id,course_assignment__degree__detail_institution_id__in=colegios, **filters_evaluacion
                        )

                        total_alumnos = evaluaciones.values('student').distinct().count()
                        total_preguntas = evaluaciones.values('question').distinct().count()

                        #obtener la lista de id de alumnos
                        # alumnos = evaluaciones.values('student').distinct()
                        alumnos = []
                        for alumno in evaluaciones.values('student').distinct():
                            filtered_evaluaciones = evaluaciones.filter(
                                student=alumno['student'],
                                score=1
                            )
                            
                            # Sumar los puntajes filtrados
                            puntaje = filtered_evaluaciones.aggregate(total_score=Sum('score'))

                            puntaje_total = puntaje['total_score'] if puntaje['total_score'] is not None else 0

                            # Calcular el porcentaje, asegurando que total_preguntas no sea 0
                            if total_preguntas > 0:
                                porcentaje = (puntaje_total / total_preguntas) * 100
                            else:
                                porcentaje = 0 
                            logro = Achievement.objects.filter(worth_min__lte=porcentaje, worth_max__gte=porcentaje).order_by('id')
                            if logro.exists():
                                logro_name = logro[0].name
                            else:
                                logro_name = "Sin logro"
                            alumnos.append({
                                "id": alumno['student'],
                                "puntaje": puntaje_total,
                                "porcentaje": porcentaje,
                                "logro": logro_name
                            })
                        data_logros = []
                        #calcular el porcentaje de logro de la competencia sumando 1 a cada logro dependiendo del logro alcanzado por el alumno
                        for logro in logros:
                            cant_alumnos = 0
                            for alumno in alumnos:
                                if logro.name == alumno['logro']:
                                    cant_alumnos += 1
                            data_logros.append({
                                "id": logro.id,
                                "logro": logro.name,
                                "valor": round(cant_alumnos / total_alumnos * 100, 2) if total_alumnos > 0 else 0
                            })   
                        data_capacidad.append({
                            "id": capacidad.id,
                            "capacidad": capacidad.code,
                            "logros": data_logros,
                        })

                    data_competencia.append({
                        "id": competencias.id,
                        "competencia": competencias.code,
                        "capacidades": data_capacidad
                    })

                else:
                    competencias = Competence.objects.filter(course=curso)
                    for competencia in competencias:
                        evaluaciones = Assessment.objects.filter(
                            question__capacity__competence__id=competencia.id,course_assignment__degree__detail_institution_id__in=colegios, **filters_evaluacion
                        )

                        total_alumnos = evaluaciones.values('student').distinct().count()
                        total_preguntas = evaluaciones.values('question').distinct().count()

                        #obtener la lista de id de alumnos
                        # alumnos = evaluaciones.values('student').distinct()
                        alumnos = []
                        for alumno in evaluaciones.values('student').distinct():
                            filtered_evaluaciones = evaluaciones.filter(
                                student=alumno['student'],
                                score=1
                            )
                            
                            # Sumar los puntajes filtrados
                            puntaje = filtered_evaluaciones.aggregate(total_score=Sum('score'))

                            puntaje_total = puntaje['total_score'] if puntaje['total_score'] is not None else 0

                            # Calcular el porcentaje, asegurando que total_preguntas no sea 0
                            if total_preguntas > 0:
                                porcentaje = (puntaje_total / total_preguntas) * 100
                            else:
                                porcentaje = 0 
                            logro = Achievement.objects.filter(worth_min__lte=porcentaje, worth_max__gte=porcentaje).order_by('id')
                            if logro.exists():
                                logro_name = logro[0].name
                            else:
                                logro_name = "Sin logro"
                            alumnos.append({
                                "id": alumno['student'],
                                "puntaje": puntaje_total,
                                "porcentaje": porcentaje,
                                "logro": logro_name
                            })
                        data_logros = []
                        #calcular el porcentaje de logro de la competencia sumando 1 a cada logro dependiendo del logro alcanzado por el alumno
                        for logro in logros:
                            cant_alumnos = 0
                            for alumno in alumnos:
                                if logro.name == alumno['logro']:
                                    cant_alumnos += 1
                            data_logros.append({
                                "id": logro.id,
                                "logro": logro.name,
                                "valor": round(cant_alumnos / total_alumnos * 100, 2) if total_alumnos > 0 else 0
                            })   
                        data_competencia.append({
                            "id": competencia.id,
                            "competencia": competencia.code,
                            "logros": data_logros,
                        })
                    
            data.append({
                "curso": curso.name,
                "competencia": data_competencia
            })


            return Response( data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)