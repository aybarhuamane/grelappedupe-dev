from rest_framework.response import Response
from rest_framework import status
from educativa.models import DetailInstitution, Course, Competence, Capacity, CourseAssignment
from evaluacion.models import Achievement, Assessment, Question
from django.db.models import Count, Q
from collections import defaultdict

def dashboard_assigned(self, request):
    try:
        competencia_id = request.GET.get("competence_id")
        course_assignment_id = request.GET.get("course_assignment_id")
        
        # Obtener datos básicos en una sola consulta
        course_assignment = CourseAssignment.objects.get(id=course_assignment_id)
        curso = course_assignment.course
        
        # Pre-cargar todos los logros
        logros = list(Achievement.objects.order_by('id'))
        logros_dict = {logro.id: logro for logro in logros}
        
        # Obtener competencias según filtro
        competencias = Competence.objects.filter(course=curso)
        competencias_list = Competence.objects.filter(course=curso)
        if competencia_id:
            competencias = competencias.filter(id=competencia_id)
        
        # Pre-cargar todas las capacidades relacionadas
        capacidades = Capacity.objects.filter(competence__in=competencias).select_related('competence')
        capacidades_por_competencia = defaultdict(list)
        for cap in capacidades:
            capacidades_por_competencia[cap.competence_id].append(cap)
        
        # Obtener todas las evaluaciones relevantes en una sola consulta
        evaluaciones = Assessment.objects.filter(
            course_assignment_id=course_assignment_id,
            question__capacity__competence__in=competencias
        ).select_related(
            'student', 'question', 'question__capacity', 'question__capacity__competence'
        ).prefetch_related(
            'question__answer_set'
        )
        
        # Procesamiento de datos
        data_competencia = []
        for competencia in competencias:
            # Datos para capacidades
            data_capacidad = []
            capacidades_competencia = capacidades_por_competencia.get(competencia.id, [])
            
            for capacidad in capacidades_competencia:
                # Filtrar evaluaciones para esta capacidad
                evals_capacidad = [e for e in evaluaciones if e.question.capacity_id == capacidad.id]
                procesado = procesar_evaluaciones(evals_capacidad, logros_dict)
                
                data_capacidad.append({
                    "id": capacidad.id,
                    "capacidad": capacidad.code,
                    "logros": procesado['data_logros'],
                })
            
            # Procesar datos para la competencia completa
            evals_competencia = [e for e in evaluaciones if e.question.capacity.competence_id == competencia.id]
            procesado_competencia = procesar_evaluaciones(evals_competencia, logros_dict)
            
            data_competencia.append({
                "id": competencia.id,
                "competencia": competencia.code,
                "capacidades": data_capacidad,
                "logros": procesado_competencia['data_logros']
            })
        
        data = [{
            "curso": curso.name,
            "competencias": competencias_list.values_list('id','name','code'),
            "data": data_competencia
        }]
        
        return Response(data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def procesar_evaluaciones(evaluaciones, logros_dict):
    """Función auxiliar para procesar evaluaciones y calcular logros"""
    if not evaluaciones:
        return {
            'alumnos_data': [],
            'data_logros': []
        }
    # Obtener datos únicos
    alumnos_ids = {e.student_id for e in evaluaciones}
    preguntas_ids = {e.question_id for e in evaluaciones}
    total_alumnos = len(alumnos_ids)
    total_preguntas = len(preguntas_ids)
    # Crear un diccionario {question_id: evaluación} para búsquedas eficientes
    evaluaciones_por_pregunta = {e.question_id: e for e in evaluaciones}

    # Obtener respuestas correctas solo para las preguntas en evaluaciones
    respuestas_correctas = {
        q_id: next((a.id for a in evaluaciones_por_pregunta[q_id].question.answer_set.all() if a.is_correct), None)
        for q_id in evaluaciones_por_pregunta.keys()
    }

    # Procesar cada alumno
    alumnos_data = []
    conteo_logros = defaultdict(int)
    
    for alumno_id in alumnos_ids:
        puntaje_total = 0
        for q_id in preguntas_ids:
            # Verificar si el alumno respondió correctamente esta pregunta
            respuestas_alumno = [
                e for e in evaluaciones 
                if e.student_id == alumno_id and e.question_id == q_id
            ]

            correcta = any(
                r.student_answer == respuestas_correctas[q_id] and r.student_answer is not None
                for r in respuestas_alumno
            )
            puntaje_total += 1 if correcta else 0
        
        porcentaje = (puntaje_total / total_preguntas * 100) if total_preguntas > 0 else 0
        # Determinar logro
        logro = next(
            (l for l in logros_dict.values() 
            if float(l.worth_min) <= porcentaje <= float(l.worth_max)),
            None
        )
        logro_name = logro.name if logro else "Sin logro"
        alumnos_data.append({
            "id": alumno_id,
            "puntaje": puntaje_total,
            "porcentaje": porcentaje,
            "logro": logro_name
        })
        
        if logro:
            conteo_logros[logro.id] += 1

    
    # Preparar datos de logros
    data_logros = []
    for logro in logros_dict.values():
        cant_alumnos = conteo_logros.get(logro.id, 0)
        
        data_logros.append({
            "id": logro.id,
            "logro": logro.name,
            "valor": round(cant_alumnos / total_alumnos * 100, 2) if total_alumnos > 0 else 0,
            "total_alumnos": cant_alumnos
        })
    
    return {
        'alumnos_data': alumnos_data,
        'data_logros': data_logros
    }