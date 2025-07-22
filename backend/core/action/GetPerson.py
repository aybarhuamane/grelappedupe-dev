from core.models import Person
from core.serializers import PersonSerializerList
from rest_framework.response import Response
from rest_framework import status

def get_person(self, request):
    try: 
        persons = Person.objects.filter(id=request.GET.get('id'))
        serializer = PersonSerializerList(persons, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
