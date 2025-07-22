import os
import pandas as pd
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from core.models import Ubigeo
from django.core.exceptions import ValidationError


class importubigeo(APIView):
    def get(self, request, *args, **kwargs):
        try:
            file_path = os.path.join(settings.MEDIA_ROOT, 'ubigeo.xlsx')
            errors = []
            importeds = []
            # Carga el archivo Excel
            data = pd.read_excel(file_path, sheet_name=0)
            data = data.to_dict(orient='records')
            for index, row in enumerate(data):
                try:
                    ubigeo_data = {
                        'code': row['code'],
                        'region': row['region'],
                        'province': row['province'],
                        'district': row['district']
                    }

                    # Validate Person data
               
                    if Ubigeo.objects.filter(code=row['code']).exists():
                        raise ValidationError(f"Ubigeo with code {row['code']} already exists.")

                    # Create Teaching instanceW
                    Ubigeo.objects.create(**ubigeo_data)
                    importeds.append(ubigeo_data)
                   
                except ValidationError as e:
                    errors.append({'line': index + 1, 'error': str(e)})
                except Exception as e:
                    errors.append({'line': index + 1, 'error': f"Unknown error: {str(e)}"})

            return Response({
                'message': f'{len(importeds)} ubigeo imported successfully',
                'imported_ubigeo': importeds
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    