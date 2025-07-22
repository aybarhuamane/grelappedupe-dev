from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from educativa.models import Student, CourseAssignment
from educativa.serializers import StudentSerializer
from django.core.exceptions import ValidationError
from evaluacion.models import Assessment, Question
from core.models import Period

class agregatestudent(APIView):
    def post(self, request, *args, **kwargs):
        try:    
                data = request.data
                course_assignment = CourseAssignment.objects.get(id=data['course_assignment_id'])
                level_id = request.data.get('level_id')
                degree_number = request.data.get('degree_number')
                period = Period.objects.get(is_active=True)
                questions = Question.objects.filter(capacity__competence__course=course_assignment.course, level_id=level_id, degree_number=degree_number)
                age = data['age']
                if Student.objects.filter(num_document=data['num_document']).exists():
                    student_instance = Student.objects.get(num_document=data['num_document'])
                    for question in questions:
                            if not Assessment.objects.filter(
                                question=question,
                                course_assignment=course_assignment,
                                period=period,
                                student=student_instance
                            ).exists():
                                assessment = Assessment.objects.create(
                                    student_age=age,
                                    period=period,
                                    student=student_instance,
                                    course_assignment=course_assignment,
                                    question=question
                                )
                            else:
                                assessment = Assessment.objects.get(
                                    student=student_instance,
                                    question=question,
                                    course_assignment=course_assignment,
                                    period=period
                                )
                                assessment.student_age = age
                                assessment.save()
                else:
                    student = Student.objects.create(
                        name=data['name'],
                        last_name=data['last_name'],
                        num_document=data['num_document'],
                        gender=data['gender']
                    )
                    student.save()
                    for question in questions:
                        assessment = Assessment.objects.create(
                            student_age=age,
                            period=period,
                            student=student,
                            course_assignment=course_assignment,
                            question=question
                        )
                return Response({'message': 'Student agregated successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)