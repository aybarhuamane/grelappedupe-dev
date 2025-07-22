import csv
import pandas as pd
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from educativa.models import Person, Teaching,TeacherInstitutionAssignment
from django.core.exceptions import ValidationError
from core.serializers import PersonSerializerList
from django.contrib.auth.models import User, Group


class importteachers(APIView):
    parser_classes = [MultiPartParser]  # Para aceptar archivos CSV/Excel

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        detail_institution_id = request.data.get('detail_institution_id')
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

            errors, imported_teachers = self.process_data(data, detail_institution_id)

           

            return Response({
                'message': f'{len(imported_teachers)} teachers imported successfully',
                'imported_teachers': imported_teachers,
                'Errors': errors
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def read_csv(self, file):
        decoded_file = file.read().decode('utf-8').splitlines()
        return list(csv.DictReader(decoded_file))

    def read_excel(self, file):
        df = pd.read_excel(file,sheet_name=0)
        return df.to_dict(orient='records')

    def process_data(self, data, detail_institution_id):
        errors = []
        imported_teachers = []
        with transaction.atomic():
            for index, row in enumerate(data):
                try:
                    person_data = {
                        'name': row.get('NAME'),
                        'last_name': row.get('LAST_NAME'),
                        'num_document': row.get('NUM_DOCUMENT'),
                        'email': row.get('EMAIL'),
                        'phone': row.get('PHONE'),
                    }

                    # Validate Person data
                    person_serializer = PersonSerializerList(data=person_data)
                    if person_serializer.is_valid(raise_exception=True):
                        if Person.objects.filter(num_document=person_data['num_document']).exists():
                            person_instance = Person.objects.get(num_document=person_data['num_document'])
                            
                        else:
                            #guardar con el viewset de Person
                           person_instance= person_serializer.save()
                    # Check if the person has a user associated
                    if not hasattr(person_instance, 'user') or person_instance.user is None:
                        # Si no tiene usuario, crear uno
                        user = User.objects.create_user(
                            username=person_instance.num_document,  # Usar el número de documento como nombre de usuario
                            password=person_instance.num_document,  # Usar el número de documento como contraseña
                            first_name=person_instance.name,
                            last_name=person_instance.last_name,
                            email=person_instance.email
                        )
                        # Asociar el usuario con la persona
                        person_instance.user = user
                        person_instance.save()  

                        # Obtener o crear el grupo "DOCENTE"
                        group, created = Group.objects.get_or_create(name='DOCENTE')

                        # Añadir al usuario al grupo "DOCENTE"
                        user.groups.add(group)

                        # Guardar el usuario con los cambios
                        user.save()
                    
                    # Check if the teacher already exists
                    teaching_instance, created = Teaching.objects.get_or_create(
                        person=person_instance, 
                        defaults={"is_active": True}
                    )

                    if not created:
                        # If the teacher already exists, check if they are assigned to the institution
                        if TeacherInstitutionAssignment.objects.filter(
                            detail_institution_id=detail_institution_id, 
                            teaching_id=teaching_instance.id
                        ).exists():
                            raise ValidationError(
                                f"Teacher with document {person_instance.num_document} is already assigned to this institution."
                            )

                    # Assign the teacher to the institution
                    TeacherInstitutionAssignment.objects.create(
                        detail_institution_id=detail_institution_id,
                        teaching_id=teaching_instance.id
                    )
                    
                    imported_teachers.append(person_data)

                except ValidationError as e:
                    errors.append({'line': index + 1, 'error': str(e)})
                except Exception as e:
                    errors.append({'line': index + 1, 'error': f"Unknown error: {str(e)}"})

        return errors, imported_teachers
