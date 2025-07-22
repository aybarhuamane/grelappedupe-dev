from rest_framework.response import Response
from rest_framework import status
import json
import os
from django.conf import settings

def dashboard_college(self, request):
    try:
        # Obtener parámetros de la solicitud una sola vez
        detailinstitution_id = request.GET.get("colegio_id")
        curso_id = request.GET.get("curso_id")
        competencia_id = request.GET.get("competencia_id")

        # Construir rutas de archivo de manera eficiente
        output_path = os.path.join(settings.MEDIA_ROOT, 'json', "dashboardcollege.json")
        
        # Cargar el archivo JSON con manejo explícito de encoding
        with open(output_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

        # Pre-compilar condiciones de filtrado
        has_detail_filter = detailinstitution_id is not None
        has_curso_filter = curso_id is not None
        has_competencia_filter = competencia_id is not None

        filtered_data = []
        
        for item in data:
            # Filtro para detailinstitution
            if has_detail_filter:
                detail_id = str(item.get('detailinstitution', {}).get('id'))
                if detail_id != detailinstitution_id:
                    continue
            
            # Procesar cursos
            cursos = item.get('cursos', [])
            cursos_filtrados = []
            
            for curso in cursos:
                # Filtro por curso_id
                if has_curso_filter and str(curso.get('id')) != curso_id:
                    continue
                
                # Filtro por competencia si existe
                if has_competencia_filter:
                    data_curso = [
                        comp for comp in curso.get('data', [])
                        if str(comp.get('id')) == competencia_id
                    ]
                    if not data_curso:  # Si no hay competencias que coincidan, saltar
                        continue
                    curso['data'] = data_curso
                
                cursos_filtrados.append(curso)
            
            # Solo agregar si hay cursos (o no se filtró por curso)
            if not has_curso_filter or cursos_filtrados:
                filtered_item = {
                    **item,
                    'cursos': cursos_filtrados
                }
                filtered_data.append(filtered_item)

        
        return Response(filtered_data, status=status.HTTP_200_OK)

    except FileNotFoundError:
        return Response({
            'message': 'Archivo no encontrado',
            'details': 'El archivo JSON no existe en la ruta especificada'
        }, status=status.HTTP_404_NOT_FOUND)
    except json.JSONDecodeError:
        return Response({
            'message': 'Error en el formato del archivo',
            'details': 'El archivo no tiene un formato JSON válido'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)