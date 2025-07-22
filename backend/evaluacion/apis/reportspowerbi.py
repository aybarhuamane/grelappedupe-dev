from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from evaluacion.models import Assessment, Question
from evaluacion.serializers import AssessmentListSerializer
from educativa.models import Student
from educativa.serializers import StudentSerializer
from evaluacion.filters import AssessmentFilter
from django_filters.rest_framework import DjangoFilterBackend



class reportpowerbi(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = AssessmentFilter
    def get(self, request):
        try:
            queryset = Assessment.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = AssessmentListSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
            