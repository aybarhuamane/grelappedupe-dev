from django.core.management import BaseCommand, call_command


class Command(BaseCommand):
    help = "Este comando ejecuta todos los comando del servicio de cuentas"

    def handle(self, *args, **kwargs):
        commands = [
            "set_institution",
            "set_detailinstitution",
        ]
        for command in commands:
            try:
                print(f"Ejecutando: {command}")
                call_command(command)
            except Exception as e:
                print(f"Error al ejecutar {command}: {e}")
