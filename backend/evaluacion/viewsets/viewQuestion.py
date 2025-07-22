from rest_framework.viewsets import ModelViewSet
from core.pagination import CustomPagination
from evaluacion.models import Question
from evaluacion.serializers import QuestionSerializer
from evaluacion.filters import QuestionFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.decorators import action
from evaluacion.actions import questions_list, create_question_answer, update_question_answer


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.order_by('id')
    serializer_class = QuestionSerializer
    pagination_class = CustomPagination
    filterset_class = QuestionFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    search_fields = ['code', 'question', 'capacity__name', 'degree_number', 'level__name','capacity__code']
    ordering_fields = ['id','code', 'is_active','capacity__id']
    ordering = ['id']

    @action(detail=False, methods=['get'])
    def questions_list(self, request):
        response = questions_list(self, request)
        return response
    
    
    @action(detail=False, methods=['post'])
    def create_question_answer(self, request):
        response = create_question_answer(self, request)
        return response
    
    @action(detail=False, methods=['post'])
    def update_question_answer(self, request):
        response = update_question_answer(self, request)
        return response
    