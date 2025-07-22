from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from educativa.models import Category, Area, Modality, EducationalLevel, Institution, DetailInstitution, Degree, Course, Competence, Capacity, CourseAssignment, Student 
from educativa.serializers import  CategorySerializer, AreaSerializer, ModalitySerializer, EducationalLevelSerializer, InstitutionSerializer, DetailInstitutionSerializer, DegreeSerializer, CourseSerializer, CompetenceSerializer, CapacitySerializer, CourseAssignmentSerializer, StudentSerializer
from educativa.filters import CategoryFilter, AreaFilter, ModalityFilter, EducationalLevelFilter, InstitutionFilter, DetailInstitutionFilter, DegreeFilter, CourseFilter, CompetenceFilter, CapacityFilter, CourseAssignmentFilter, StudentFilter
from django_filters.rest_framework import DjangoFilterBackend



class powerbicategory(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = CategoryFilter
    def get(self, request):
        try:
            queryset = Category.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = CategorySerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

class powerbiarea(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = AreaFilter
    def get(self, request):
        try:
            queryset = Area.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = AreaSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
class powerbimodality(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = ModalityFilter
    def get(self, request):
        try:
            queryset = Modality.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = ModalitySerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    
class powerbieducationallevel(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = EducationalLevelFilter
    def get(self, request):
        try:
            queryset = EducationalLevel.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = EducationalLevelSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
class powerbiinstitution(APIView):
    #filterset_class = InstitucionFilter
    def get(self, request):
        try:
            queryset = Institution.objects.order_by('id')
            serializer = InstitutionSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

class powerbidetailinstitution(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = DetailInstitutionFilter
    def get(self, request):
        try:
            queryset = DetailInstitution.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = DetailInstitutionSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

class powerbidegree(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = DegreeFilter
    def get(self, request):
        try:
            queryset = Degree.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = DegreeSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    
class powerbicourse(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = CourseFilter
    def get(self, request):
        try:
            queryset = Course.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = CourseSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

class powerbicompetence(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = CompetenceFilter
    def get(self, request):
        try:
            queryset = Competence.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = CompetenceSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    
class powerbicapacity(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = CapacityFilter
    def get(self, request):
        try:
            queryset = Capacity.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = CapacitySerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

class powerbicourseassignment(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = CourseAssignmentFilter
    def get(self, request):
        try:
            queryset = CourseAssignment.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = CourseAssignmentSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

class powerbistudent(APIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = StudentFilter
    def get(self, request):
        try:
            queryset = Student.objects.order_by('id')
            filtered_queryset = self.filterset_class(request.GET, queryset=queryset).qs
            serializer = StudentSerializer(filtered_queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

