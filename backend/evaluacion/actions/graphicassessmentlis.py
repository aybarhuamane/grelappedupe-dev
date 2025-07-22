from django.db.models import  Count, Case, When, IntegerField, Q
from django.db.models.functions import Coalesce
from rest_framework.response import Response
from rest_framework import status
from evaluacion.models import Assessment, Answer

def graphic_assessment_list(self, request):
    try:

        course_assignment_id = request.GET.get('course_assignment_id')

        # Base filters
        filters_evaluacion = {}
        if course_assignment_id:
            filters_evaluacion["course_assignment_id"] = course_assignment_id

        # First optimization: Get student gender counts in a single query
        student_stats = (
            Assessment.objects.filter(**filters_evaluacion)
            .values('student_id', 'student__gender')
            .distinct()
            .aggregate(
                femenino=Count(Case(When(student__gender='F', then=1), output_field=IntegerField())),
                masculino=Count(Case(When(student__gender='M', then=1), output_field=IntegerField()))
            ))
        
        # Second optimization: Get answer statistics in bulk
        answer_stats = (
        Assessment.objects.filter(**filters_evaluacion)
        .exclude(student_answer=0)  # Exclude unanswered questions
        .aggregate(
            total=Count('id'),
            omitidas=Count(Case(When(student_answer__isnull=True, then=1), output_field=IntegerField())),
            adecuadas=Count(
                Case(
                    When(
                        Q(student_answer__isnull=False) & 
                        Q(student_answer__in=Answer.objects.filter(
                            question_id=Coalesce('question_id', 0),
                            is_correct=True
                        ).values('id')),
                        then=1
                    ),
                    output_field=IntegerField()
                )
            )
        ))
    
        # Calculate inadecuadas based on other values
        answer_stats['inadecuadas'] = (
            answer_stats.get('total', 0) - 
            answer_stats.get('omitidas', 0) - 
            answer_stats.get('adecuadas', 0)
        )

        # Build consolidated result
        consolidated_result = {
            'student': {
                'femenino': student_stats.get('femenino', 0),
                'masculino': student_stats.get('masculino', 0),
            },
            'result': {
                'adecuadas': answer_stats.get('adecuadas', 0),
                'inadecuadas': max(answer_stats.get('inadecuadas', 0), 0),  # Ensure not negative
                'omitidas': answer_stats.get('omitidas', 0),
                'total': answer_stats.get('total', 0),
            }
        }

        return Response(consolidated_result, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)