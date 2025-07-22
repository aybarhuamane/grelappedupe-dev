from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from evaluacion.models import Assessment, Question, Achievement
from evaluacion.serializers import AssessmentSerializer, QuestionSerializer, AchievementSerializer
from evaluacion.filters import AssessmentFilter, AchievementFilter, QuestionFilter
from django_filters.rest_framework import DjangoFilterBackend



class powerbiassessment(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = AssessmentFilter
    def get(self, request):
        try:
            queryset = Assessment.objects.all()
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = AssessmentSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class powerbiquestion(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = QuestionFilter
    def get(self, request):
        try:
            queryset = Question.objects.all()
            serializer = QuestionSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class powerbiachievement(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = AchievementFilter
    def get(self, request):
        try:
            queryset = Achievement.objects.all()
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = AchievementSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
            