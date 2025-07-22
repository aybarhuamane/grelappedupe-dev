from rest_framework.response import Response
from rest_framework import status
from django.core.management import call_command
from threading import Thread

def async_call_command(command):
    try:
        call_command(command)
    except Exception as e:
        # Aquí puedes agregar logging del error si lo necesitas
        print(f"Error ejecutando comando {command}: {str(e)}")
    finally:
        print("Limpieza de recursos")

def command_dashboard_college(self, request):
    # Inicia el comando en un hilo separado
    thread = Thread(target=async_call_command, args=('set_dashboard_college',))
    thread.daemon = True  # Esto hace que el hilo no impida que el programa principal termine
    thread.start()
    
    return Response({
        "message": "Comando lanzado en segundo plano. La ejecución continúa asincrónicamente.",
    }, status=status.HTTP_200_OK)