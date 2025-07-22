from core.pagination import CustomPagination
from evaluacion.models import Assessment
from evaluacion.serializers import AssessmentBulkSerializer
from evaluacion.filters import AssessmentFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework_bulk import (
    BulkModelViewSet,
)
from rest_framework.decorators import action
from evaluacion.actions import *


class AssessmentBulkViewSet(BulkModelViewSet):
    queryset = Assessment.objects.order_by('id')
    serializer_class = AssessmentBulkSerializer
    pagination_class = CustomPagination
    filterset_class = AssessmentFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['id','date', 'score','period__id','course_assignment__id','student__id','student_age','question__id']
    ordering = ['id']

    @action(detail=False, methods=['get'], url_path='validation-assessment-list')
    def validation_assessment_list(self, request):
        response = validation_assessment_list(self, request)
        return response
    
    @action(detail=False, methods=['get'], url_path='graphic-assessment-list')
    def graphic_assessment_list(self, request):
        response = graphic_assessment_list(self, request)
        return response
    
    @action(detail=False, methods=['get'], url_path='dashboard-college')
    def dashboard_college(self, request):
        response = dashboard_college(self, request)
        return response
    
    @action(detail=False, methods=['get'], url_path='detail-dashboard')
    def detail_dashboard(self, request):
        response = detail_dashboard(self, request)
        return response
    
    @action(detail=False, methods=['get'], url_path='dashboard')
    def api_dashboard(self, request):
        response = api_dashboard(self, request)
        return response
    
    @action(detail=False, methods=['POST'], url_path='delete-assessments')
    def delete_assessments(self, request):
        response = delete_assmessments(request)
        return response
    
    @action(detail=False, methods=['get'], url_path='dashboard-assigned')
    def dashboard_assigned(self, request):
        response = dashboard_assigned(self, request)
        return response
    
    @action(detail=False, methods=['get'], url_path='command-dashboard-college')
    def command_dashboard_college(self, request):
        response = command_dashboard_college(self, request)
        return response