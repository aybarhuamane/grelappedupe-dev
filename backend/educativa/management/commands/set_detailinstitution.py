import json
import os
from django.core.management import BaseCommand
from educativa.models import DetailInstitution, Institution, EducationalLevel, Area
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = 'Set the detail institution data s'

    def handle(self, *args, **kwargs):
        # Definir la ruta del archivo JSON
        file_path = os.path.join(os.path.dirname(__file__), 'json', 'detailInstitution.json')

        try:

            # Abrir y cargar el archivo JSON
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)

            # Verificar que la clave 'data' exista
            if 'data' not in data:
                self.stderr.write(self.style.ERROR("El JSON no contiene la clave 'data'."))
                return

            # Procesar cada modulo en el 
            for item in data['data']:
                if not all(k in item for k in ['institution','local_code','modular_code','level','area']):
                    self.stderr.write(self.style.ERROR(f"Faltan campos en el modulo: {item}"))
                    continue

                area = Area.objects.filter(name=item['area']).first()
                if not area:
                    self.stderr.write(self.style.ERROR(f"El area '{item['area']}' no existe."))
                    continue

                institution = Institution.objects.filter(name=item['institution']).first()
                if not institution:
                    self.stderr.write(self.style.ERROR(f"La institución '{item['institution']}' no existe."))
                    continue

                level = EducationalLevel.objects.filter(name=item['level']).first()
                if not level:
                    self.stderr.write(self.style.ERROR(f"El nivel educativo '{item['level']}' no existe."))
                    continue

                group, _ = Group.objects.get_or_create(name='USERIE') # Obtener el grupo una sola vez

                user, created = User.objects.update_or_create(
                    username=item['modular_code'],
                    defaults={
                        'email': f"{item['modular_code']}@gmail.com",
                        'password': make_password(item['modular_code']),
                        'first_name': item['institution']
                    }
                )
                if created:
                    user.groups.add(group)


                # Crear o actualizar el modulo
                detailInstitution, created = DetailInstitution.objects.update_or_create(
                    modular_code = item['modular_code'],
                    local_code = item['local_code'],
                    defaults={
                        'institution': institution,
                        'level': level,
                        'area': area,
                        'user': user
                    }
                )

                action = "Creado" if created else "Actualizado"
                self.stdout.write(self.style.SUCCESS(f"Modulo {action}: {detailInstitution.modular_code}- {detailInstitution.local_code}"))

            self.stdout.write(self.style.SUCCESS("Todos los modulos se procesaron correctamente."))

        except FileNotFoundError:
            self.stderr.write(self.style.ERROR(f"El archivo '{file_path}' no se encontró."))
        except json.JSONDecodeError:
            self.stderr.write(self.style.ERROR("El archivo JSON tiene un formato inválido."))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Ocurrió un error: {e}"))
