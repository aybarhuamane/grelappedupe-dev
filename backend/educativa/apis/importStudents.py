import csv
import pandas as pd
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from educativa.models import Student, CourseAssignment
from educativa.serializers import StudentSerializer
from django.core.exceptions import ValidationError
from evaluacion.models import Assessment, Question
from core.models import Period

class importstudents(APIView):
    parser_classes = [MultiPartParser]  # Para aceptar archivos CSV/Excel

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        course_assigned_id = request.data.get('course_assigned_id')
        level_id = request.data.get('level_id')
        degree_number = request.data.get('degree_number')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        file_extension = file.name.split('.')[-1].lower()

        try:
            if file_extension == 'csv':
                data = self.read_csv(file)
            elif file_extension in ['xls', 'xlsx']:
                data = self.read_excel(file)
            else:
                return Response({'error': 'Unsupported file format'}, status=status.HTTP_400_BAD_REQUEST)

            errors, imported_students = self.process_data(data,course_assigned_id, degree_number, level_id)

            

            return Response({
                'message': f'{len(imported_students)} students imported successfully',
                'imported_students': imported_students,
                'errors': errors
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def read_csv(self, file):
        decoded_file = file.read().decode('utf-8').splitlines()
        return list(csv.DictReader(decoded_file))

    def read_excel(self, file):
        df = pd.read_excel(file,sheet_name=0)
        return df.to_dict(orient='records')

    def process_data(self, data,course_assigned_id, degree_number, level_id):
        errors = []
        imported_students = []

        with transaction.atomic():
            for index, row in enumerate(data):
                try:
                    student_data = {
                        'name': row.get('NAME'),
                        'last_name': row.get('LAST_NAME'),
                        'num_document': row.get('NUM_DOCUMENT'),
                        'gender': row.get('GENDER'),
                    }   
                    age = row.get('AGE')
                    course_assignment = CourseAssignment.objects.get(id=course_assigned_id)
                    period = Period.objects.get(is_active=True)
                    questions = Question.objects.filter(capacity__competence__course_id=course_assignment.course.id, degree_number =degree_number, level_id = level_id)
                   
                    student_instance, student_created = Student.objects.update_or_create(
                        num_document=student_data['num_document'],
                        defaults={
                            'name': student_data['name'],
                            'last_name': student_data['last_name'],
                            'gender': student_data['gender']
                        }
                    )
                    assessments_to_create = []
                    if student_created:
                        Assessment.objects.bulk_create([
                            Assessment(
                                student_age=age,
                                period=period,
                                student=student_instance,
                                course_assignment=course_assignment,
                                question=question
                            )
                            for question in questions
                        ])
                        imported_students.append(student_data)
                    
                    if student_instance:
                        existing_assessments = Assessment.objects.filter(
                            student=student_instance,
                            course_assignment=course_assignment,
                            period=period
                        ).select_related('question')

                        existing_question_ids = {a.question_id for a in existing_assessments}
                        questions_to_update = []

                        for question in questions:
                            if question.id not in existing_question_ids:
                                assessments_to_create.append(
                                    Assessment(
                                        student_age=age,
                                        period=period,
                                        student=student_instance,
                                        course_assignment=course_assignment,
                                        question=question
                                    )
                                )
                            else:
                                questions_to_update.append(question.id)

                        if assessments_to_create:
                            Assessment.objects.bulk_create(assessments_to_create)

                        if questions_to_update:
                            Assessment.objects.filter(
                                student=student_instance,
                                course_assignment=course_assignment,
                                period=period,
                                question_id__in=questions_to_update
                            ).update(student_age=age)
                        
                        num_document = str(student_data['num_document'])
                        errors.append({'line': index + 1, 'error': f"Student with document {num_document},your data was updated."})
                    
                except ValidationError as e:
                    errors.append({'line': index + 1, 'error': str(e)})
                except Exception as e:
                    errors.append({'line': index + 1, 'error': f"Unknown error: {str(e)}"})

        return errors, imported_students

        errors = []
        imported_students = []
        students_to_create = []
        students_to_update = []
        assessments_to_create = []

        with transaction.atomic():
            course_assignment = CourseAssignment.objects.get(id=course_assigned_id)
            period = Period.objects.get(is_active=True)
            questions = Question.objects.filter(capacity__competence__course=course_assignment.course, degree_number=degree_number, level_id=level_id)

            # Primero, procesar todos los estudiantes
            for index, row in enumerate(data):
                try:
                    student_data = {
                        'name': row.get('NAME'),
                        'last_name': row.get('LAST_NAME'),
                        'num_document': row.get('NUM_DOCUMENT'),
                        'gender': row.get('GENDER'),
                    }
                    age = row.get('AGE')

                    student_serializer = StudentSerializer(data=student_data)
                    if student_serializer.is_valid(raise_exception=True):
                        num_document = student_data['num_document']
                        if Student.objects.filter(num_document=num_document).exists():
                            student_instance = Student.objects.get(num_document=num_document)
                            student_instance.name = student_data['name']
                            student_instance.last_name = student_data['last_name']
                            student_instance.gender = student_data['gender']
                            students_to_update.append(student_instance)
                            errors.append({'line': index + 1, 'error': f"Student with document {num_document}, your data was updated."})
                        else:
                            student_instance = Student(**student_data)
                            students_to_create.append(student_instance)
                            imported_students.append(student_serializer.data)

                except ValidationError as e:
                    errors.append({'line': index + 1, 'error': str(e)})
                except Exception as e:
                    errors.append({'line': index + 1, 'error': f"Unknown error: {str(e)}"})

            # Guardar todos los estudiantes nuevos
            Student.objects.bulk_create(students_to_create)

            # Actualizar todos los estudiantes existentes
            Student.objects.bulk_update(students_to_update, ['name', 'last_name', 'gender'])

            # Ahora, procesar las evaluaciones para los estudiantes ya guardados
            for index, row in enumerate(data):
                try:
                    student_data = {
                        'name': row.get('NAME'),
                        'last_name': row.get('LAST_NAME'),
                        'num_document': row.get('NUM_DOCUMENT'),
                        'gender': row.get('GENDER'),
                    }
                    age = row.get('AGE')

                    num_document = student_data['num_document']
                    student_instance = Student.objects.get(num_document=num_document)

                    for question in questions:
                        if not Assessment.objects.filter(
                            student=student_instance,
                            question=question,
                            course_assignment=course_assignment,
                            period=period
                        ).exists():
                            assessments_to_create.append(Assessment(
                                student_age=age,
                                period=period,
                                student=student_instance,
                                course_assignment=course_assignment,
                                question=question
                            ))

                except Exception as e:
                    errors.append({'line': index + 1, 'error': f"Unknown error: {str(e)}"})

            # Crear todas las evaluaciones en lote
            Assessment.objects.bulk_create(assessments_to_create)

        return errors, imported_students