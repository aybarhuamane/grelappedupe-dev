from rest_framework.response import Response
from rest_framework import status
from evaluacion.models import Assessment

def delete_assmessments(request):
    try: 
        student_id = request.data.get('student_id')
        course_assignment_id = request.data.get('course_assignment_id')


        if not student_id or not course_assignment_id:
            return Response({
                'message': 'Faltan datos requeridos para eliminar la evaluación.'
            }, status=status.HTTP_400_BAD_REQUEST)
        assessments = Assessment.objects.filter(student_id=student_id, course_assignment_id=course_assignment_id)
        if not assessments.exists():
            return Response({
                'message': 'No se encontraron evaluaciones para eliminar.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        assessments.delete()
        # Si se eliminan las evaluaciones, se puede devolver un mensaje de éxito o vacío.
        return Response({
            'message': 'Estudiante removido de la evaluación correctamente.'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
