from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from core.models import Person
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from core.functions import read_csv, read_excel


def import_person(self,request):
    file = request.FILES.get('file')
    if not file:
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

    file_extension = file.name.split('.')[-1].lower()
    try:
        if file_extension == 'csv':
            data = read_csv(file)
        elif file_extension in ['xls', 'xlsx']:
            data = read_excel(file)
        else:
            return Response({'error': 'Unsupported file format'}, status=status.HTTP_400_BAD_REQUEST)
        
        errors, imported_personas = process_data(data)
        
        return Response({
            'message': f'{len(imported_personas)} personas importadas correctamente',
            'imported_personas': imported_personas,
            'errors': errors
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
def process_data(data):
        errors = []
        imported_personas = []

        with transaction.atomic():
            for index, row in enumerate(data):
                try:
                    student_data = {
                        'name': row.get('NAME'),
                        'last_name': row.get('LAST_NAME'),
                        'num_document': row.get('NUM_DOCUMENT'),
                        'email': row.get('EMAIL'),
                        'phone': row.get('PHONE'),
                    }   
                    if not Person.objects.filter(num_document=student_data['num_document']).exists():
                        person = Person(**student_data)
                        person.full_clean()
                        user = User.objects.create_user(
                            username=person.num_document,
                            password=person.num_document,
                            first_name=person.name,
                            last_name=person.last_name,
                            email=person.email
                        )
                        person.user = user
                        person.save()
                        imported_personas.append({
                            "num_document": person.num_document,
                        })

                    else:
                        errors.append({'line': index + 1, 'error': 'Person already exists'})

                    
                except ValidationError as e:
                    errors.append({'line': index + 1, 'error': str(e)})
                except Exception as e:
                    errors.append({'line': index + 1, 'error': f"Unknown error: {str(e)}"})

        return errors, imported_personas
