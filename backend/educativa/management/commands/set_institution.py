import json
import os
from django.core.management import BaseCommand
from educativa.models import Institution, Ubigeo

class Command(BaseCommand):
    help = 'Set the institution data'

    def handle(self, *args, **kwargs):
        # Definir la ruta del archivo JSON
        file_path = os.path.join(os.path.dirname(__file__), 'json', 'institution.json')

        try:

            # Abrir y cargar el archivo JSON
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)

            # Verificar que la clave 'data' exista
            if 'data' not in data:
                self.stderr.write(self.style.ERROR("El JSON no contiene la clave 'data'."))
                return

            # Procesar cada modulo en el JSON
            for item in data['data']:
                if not all(k in item for k in ['name','address','latitude','longitude','ubigeo']):
                    self.stderr.write(self.style.ERROR(f"Faltan campos en el modulo: {item}"))
                    continue

                ubigeo = Ubigeo.objects.filter(code=item['ubigeo']).first()
                if not ubigeo:
                    self.stderr.write(self.style.ERROR(f"El ubigeo '{item['ubigeo']}' no existe."))
                    continue

                # Crear o actualizar el modulo
                institution, created = Institution.objects.update_or_create(
                    name = item['name'],
                    defaults={
                        'address': item['address'],
                        'latitude': item['latitude'],
                        'longitude': item['longitude'],
                        'ubigeo': ubigeo
                    }
                )

                action = "Creado" if created else "Actualizado"
                self.stdout.write(self.style.SUCCESS(f"Modulo {action}: {institution.name}"))

            self.stdout.write(self.style.SUCCESS("Todos los modulos se procesaron correctamente."))

        except FileNotFoundError:
            self.stderr.write(self.style.ERROR(f"El archivo '{file_path}' no se encontró."))
        except json.JSONDecodeError:
            self.stderr.write(self.style.ERROR("El archivo JSON tiene un formato inválido."))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Ocurrió un error: {e}"))
