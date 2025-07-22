from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from educativa.models import DetailInstitution,  Course, Competence, Capacity
from evaluacion.models import Achievement, Assessment, Question
from evaluacion.serializers import AchievementSerializer, AssessmentSerializer
from django.db.models import Sum

def api_dashboard(self, request):
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
        curso = Course.objects.get(id=curso_id)
        logros = Achievement.objects.all()
        if competencia_id:
            competencias = [Competence.objects.get(id=competencia_id, course=curso)]
        else:
            competencias = Competence.objects.filter(course=curso)

        for competencia in competencias:
            capacidades = Capacity.objects.filter(competence=competencia)
            data_capacidad = []


            for capacidad in capacidades:
                evaluaciones = Assessment.objects.filter(
                    question__capacity__id=capacidad.id,
                    course_assignment__degree__detail_institution_id__in=colegios,
                    **filters_evaluacion
                )

                total_alumnos = evaluaciones.values('student').distinct().count()
                total_preguntas = evaluaciones.values('question').distinct().count()
                questions = evaluaciones.values('question').distinct()

                alumnos = []
                for alumno in evaluaciones.values('student').distinct():
                    puntaje_total = 0
                    for q in questions:
                        question_id = q['question']
                        filtered_evaluaciones = evaluaciones.filter(
                            student=alumno['student'],
                            question=question_id
                        )
                        correct_answer = filtered_evaluaciones.filter(
                            student=alumno['student'],
                            question=question_id,
                            student_answer=Question.objects.get(id=question_id).answer_set.filter(is_correct=True).first().id if Question.objects.get(id=question_id).answer_set.filter(is_correct=True).exists() else None,
                            student_answer__isnull=False
                        )
                        puntaje_total += correct_answer.count()

                    porcentaje = (puntaje_total / total_preguntas * 100) if total_preguntas > 0 else 0

                    logro = Achievement.objects.filter(worth_min__lte=porcentaje, worth_max__gte=porcentaje)
                    logro_name = logro[0].name if logro.exists() else "Sin logro"

                    alumnos.append({
                        "id": alumno['student'],
                        "puntaje": puntaje_total,
                        "porcentaje": porcentaje,
                        "logro": logro_name
                    })

                  
                data_logros = []
                for logro in Achievement.objects.all():
                    cant_alumnos = sum(1 for alumno in alumnos if alumno['logro'] == logro.name)
                    data_logros.append({
                        "id": logro.id,
                        "logro": logro.name,
                        "valor": round(cant_alumnos / total_alumnos * 100, 2) if total_alumnos > 0 else 0,
                        "total_alumnos": cant_alumnos
                    })

                data_logros.sort(key=lambda x: x['id'])

                data_capacidad.append({
                    "id": capacidad.id,
                    "capacidad": capacidad.code,
                    "logros": data_logros,
                })

            evaluaciones_competence = Assessment.objects.filter(
                question__capacity__competence__id=competencia.id,course_assignment__degree__detail_institution_id__in=colegios, **filters_evaluacion
            )
            total_alumnos =  evaluaciones_competence.values('student').distinct().count()
            total_preguntas =  evaluaciones_competence.values('question').distinct().count()
            question =  evaluaciones_competence.values('question').distinct()
        
            # alumnos = evaluaciones.values('student').distinct()
            alumnos__competence = []
            for alumno in evaluaciones_competence.values('student').distinct():
                # comparar la respuesta del alumno con la respuesta correcta
                puntaje_total = 0
                for q in question:
                    question_id = q['question']
                    # filtrar las evaluaciones por alumno y por pregunta
                    filtered_evaluaciones_competence = evaluaciones_competence.filter(
                        student=alumno['student'],
                        question=question_id
                    )
                    correct_answer_competence =  filtered_evaluaciones_competence.filter(
                        student=alumno['student'],
                        question=question_id,
                        student_answer=Question.objects.get(id=question_id).answer_set.filter(is_correct=True).first().id if Question.objects.get(id=question_id).answer_set.filter(is_correct=True).exists() else None,
                        student_answer__isnull=False
                    )
                    # Sumar los puntajes filtrados
                    puntaje_total += correct_answer_competence.count()
                # Calcular el porcentaje, asegurando que total_preguntas no sea 0
                if total_preguntas > 0:
                    porcentaje = (puntaje_total / total_preguntas) * 100
                else:
                    porcentaje = 0 

                logro_cpmpetence = Achievement.objects.filter(worth_min__lte=porcentaje, worth_max__gte=porcentaje)
                if logro_cpmpetence.exists():
                    logro_name = logro_cpmpetence[0].name
                else:
                    logro_name = "Sin logro"

                alumnos__competence.append({
                    "id": alumno['student'],
                    "puntaje": puntaje_total,
                    "porcentaje": porcentaje,
                    "logro": logro_name
                })

            data_logros_competence = []
            #calcular el porcentaje de logro de la competencia sumando 1 a cada logro dependiendo del logro alcanzado por el alumno
            for logro in logros:
                cant_alumnos = 0
                for alumno in alumnos__competence:
                    if logro.name == alumno['logro']:
                        cant_alumnos += 1

                data_logros_competence.append({
                    "id": logro.id,
                    "logro": logro.name,
                    "valor": round(cant_alumnos / total_alumnos * 100, 2) if total_alumnos > 0 else 0,
                    "total_alumnos": cant_alumnos
                })   

            #odernar los logros por id
            data_logros_competence.sort(key=lambda x: x['id'])

            data_competencia.append({
                "id": competencia.id,
                "competencia": competencia.code,
                "capacidades": data_capacidad,
                "logros": data_logros_competence
            })

        data.append({
            "curso": curso.name,
            "data": data_competencia
        })

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)