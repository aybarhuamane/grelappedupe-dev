from django_filters import rest_framework as filters
from evaluacion.models import Assessment


class AssessmentFilter(filters.FilterSet):
    class Meta:
        model = Assessment
        fields = {
            'id': ['exact'],
            'date': ['exact'],
            'period__id': ['exact'],
            'course_assignment__id': ['exact','in'],
            'course_assignment__degree__detail_institution__id': ['exact'],
            'student__id': ['exact'],
            'student_age': ['exact','gte','lte'],
            'question__id': ['exact'],
            'question__capacity__id':['exact'],
            'question__capacity__competence__id':['exact'],
            'question__capacity__competence__course__id':['exact'],
        }