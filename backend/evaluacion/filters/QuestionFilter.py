from django_filters import rest_framework as filters
from evaluacion.models import Question


class QuestionFilter(filters.FilterSet):
    class Meta:
        model = Question
        fields = {
            'id': ['exact'],
            'code': ['exact','icontains'],
            'question': ['exact','icontains'],
            'is_active':['exact'],
            'capacity__id':['exact'],
            'capacity__competence__id':['exact'],
            'capacity__competence__course__id':['exact'],
            'level__id':['exact'],
            'degree_number':['exact'],
        }
