from django_filters import rest_framework as filters
from evaluacion.models import Answer


class AnswerFilter(filters.FilterSet):
    class Meta:
        model = Answer
        fields = {
            'id': ['exact'],
            'question__id': ['exact'],
            'is_correct': ['exact'],
            'answer': ['exact','icontains'],
        }