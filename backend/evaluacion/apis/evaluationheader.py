from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from educativa.models import Course,Competence,Capacity
from educativa.serializers import CourseSerializer,CompetenceSerializer,CapacitySerializer
from evaluacion.models import Question
from evaluacion.serializers import QuestionSerializer


class evaluationheader(APIView):
    def get(self, request):
        try:
            #variables
            obj_header = []
            obj_competence = []
            obj_capacity = []
            # Obtener el curso
            courses = Course.objects.filter(id = request.GET.get('course_id'))
            course_serializer = CourseSerializer(courses, many=True)
            # Obtener las competencias
            competences = Competence.objects.filter(course_id = request.GET.get('course_id'))
          
            for c in competences:
                capacities = Capacity.objects.filter(competence_id = c.id)
                c_serializer = CompetenceSerializer(c)
                for ca in capacities:
                    ca_serializer = CapacitySerializer(ca)
                    questions = Question.objects.filter(capacity_id = ca.id, degree_number = request.GET.get('degree_number'), level_id = request.GET.get('level_id'))
                    question_serializer = QuestionSerializer(questions, many=True)
                    obj_capacity.append({
                        "capacity": ca_serializer.data,
                        "question": question_serializer.data
                    })
                obj_competence.append({
                    "competence": c_serializer.data,
                    "capacity": obj_capacity
                })
                obj_capacity = []

            obj_header.append({
                "course": course_serializer.data,
                "data": obj_competence
            })
            return Response(obj_header, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)



