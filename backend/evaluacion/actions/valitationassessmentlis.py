from django.db.models import Prefetch
from rest_framework.response import Response
from rest_framework import status
from evaluacion.models import Assessment,  Answer
from educativa.serializers import StudentSerializer
from collections import defaultdict

def validation_assessment_list(self, request):
    try: 
        course_assignment_id = request.GET.get('course_assignment_id')

        filters_evaluacion = {}
        if course_assignment_id:
            filters_evaluacion["course_assignment_id"] = course_assignment_id

        # Optimize queries with select_related and prefetch_related
        assessments = Assessment.objects.filter(**filters_evaluacion).select_related(
            'student'
        ).prefetch_related(
            Prefetch('question__answer_set', queryset=Answer.objects.all())
        )

        if not assessments.exists():
            return Response({"message": "No data"}, status=status.HTTP_200_OK)

        # Dictionary to group evaluations by student
        students_dict = defaultdict(lambda: {
            'student': None,
            'result': {
                'adecuadas': 0,
                'inadecuadas': 0,
                'omitidas': 0,
                "omitidas_porcentaje": 0,
                "adecuadas_porcentaje": 0,
                "inadecuadas_porcentaje": 0,
                'total': 0,
                'nsp': False
            }
        })

        for assessment in assessments:
            student_id = assessment.student_id
            if students_dict[student_id]['student'] is None:
                student = assessment.student
                students_dict[student_id]['student'] = StudentSerializer(student).data
                students_dict[student_id]['student']['age'] = assessment.student_age
            students_dict[student_id]['result']['total'] += 1
            question = assessment.question
            answers = question.answer_set.all()

            if assessment.student_answer == 0:
                students_dict[student_id]['result']['nsp'] = True
            else:
                if assessment.student_answer is None:
                    students_dict[student_id]['result']['omitidas'] += 1
                else:
                    correct_answer = answers.filter(is_correct=True).first()
                    if correct_answer is not None:
                        if correct_answer.id == assessment.student_answer:
                            students_dict[student_id]['result']['adecuadas'] += 1
                        else:
                            students_dict[student_id]['result']['inadecuadas'] += 1

        for student_data in students_dict.values():
            omitidas = student_data['result']['omitidas']
            adecuadas = student_data['result']['adecuadas']
            inadecuadas = student_data['result']['inadecuadas']
            total_preguntas = student_data['result']['total']
            student_data['result']['omitidas_porcentaje'] = round((omitidas / total_preguntas) * 100, 2)
            student_data['result']['adecuadas_porcentaje'] = round((adecuadas / total_preguntas) * 100, 2)
            student_data['result']['inadecuadas_porcentaje'] = round((inadecuadas / total_preguntas) * 100, 2)  

        obj_student = list(students_dict.values())
       

        return Response(obj_student, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
