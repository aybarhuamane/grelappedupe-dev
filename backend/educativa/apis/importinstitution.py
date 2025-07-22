import os
import pandas as pd
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from core.models import Ubigeo
from educativa.models import Institution, DetailInstitution, EducationalLevel, Area
from django.core.exceptions import ValidationError


class importinstitution(APIView):
    def get(self, request, *args, **kwargs):
        try:
            file_path = os.path.join(settings.MEDIA_ROOT, 'colegio.xlsx')
            errors = []
            importeds_i = []
            importeds_d = []
            existe_i = []
            existe_d = []
            # Carga el archivo Excel
            # # data_institution = pd.read_excel(file_path, sheet_name=0)
            # # data_institution = data_institution.to_dict(orient='records')
            # # for index, row in enumerate(data_institution):
            # #     try:
            # #         ubigeo= Ubigeo.objects.get(region__icontains=row.get('region'), province__icontains=row.get('provincia'), district__icontains=row.get('distrito'))
            # #         colegio_data = {
            # #             "name": row.get('name'),
            # #             "address": row.get('address'),
            # #             "latitude": row.get('latitude'),
            # #             "longitude": row.get('longitude'),
            # #             "ubigeo_id": ubigeo.id
                        

            # #         }

            # #         # Validate Person data
               
            # #         if Institution.objects.filter(name=row.get('name')).exists():
            # #             existe_i.append(row.get('name'))
            # #         else:
            # #             # Create Teaching instanceW
            # #             Institution.objects.create(**colegio_data)
            # #             importeds_i.append(colegio_data)
            # #     except Exception as e:
            # #         errors.append({'line': index + 1,'NAME': row.get('name'), 'error': str(e)})
            
            data_detail = pd.read_excel(file_path, sheet_name=1)
            data_detail = data_detail.to_dict(orient='records')
            for index, row in enumerate(data_detail):
                try:
                    institution = Institution.objects.get(name=row.get('institution'))
                    level = EducationalLevel.objects.get(name=row.get('level'))
                    area = Area.objects.get(name=row.get('area'))
                    detail_data = {
                        "institution_id": institution.id,
                        "local_code": row.get('local_code'),
                        "modular_code": row.get('modular_code'),
                        "level_id": level.id,
                        "area_id": area.id
                    }

               
                    if DetailInstitution.objects.filter(local_code=row.get('local_code'),modular_code=row.get('modular_code')).exists():
                            existe_d.append(row.get('local_code'))

                    else:
                        DetailInstitution.objects.create(**detail_data)
                        importeds_d.append(detail_data)

                except Exception as e:
                    errors.append({'line': index + 1, 'error': str(e)})

            return Response({
                'colegios': f'{len(importeds_i)}  imported successfully',
                'datalles': f'{len(importeds_d)} DetailInstitutions imported successfully',
                'colegios_existentes': f'{len(existe_i)} Institutions already exists',
                'detalles_existentes': f'{len(existe_d)} DetailInstitutions already exists',
                'errors': errors
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     