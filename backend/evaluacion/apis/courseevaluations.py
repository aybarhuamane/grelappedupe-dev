from django.db.models import Prefetch
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from evaluacion.models import Assessment, Question, Answer
from evaluacion.serializers import QuestionListTableSerializer, AnswerSerializer
from educativa.models import Student
from educativa.serializers import StudentSerializer

class courseevaluations(APIView):
    def get(self, request):
        try:
            student_id = request.GET.get('student_id')
            course_assignment_id = request.GET.get('course_assignment_id')

            filters_evaluacion = {}
            if course_assignment_id:
                filters_evaluacion["course_assignment_id"] = course_assignment_id
            if student_id:
                filters_evaluacion["student_id"] = student_id

            # Optimize queries with select_related and prefetch_related
            assessments = Assessment.objects.filter(**filters_evaluacion).select_related(
                'student', 'question'
            ).prefetch_related(
                Prefetch('question__answer_set', queryset=Answer.objects.all())
            )

            if not assessments.exists():
                return Response({"message": "No data"}, status=status.HTTP_200_OK)

            # Dictionary to group evaluations by student
            students_dict = {}

            for assessment in assessments:
                student_id = assessment.student_id
                if student_id not in students_dict:
                    student = assessment.student
                    students_dict[student_id] = {
                        "student": StudentSerializer(student).data,
                        "evaluation": []
                    }

                question = assessment.question
                answers = question.answer_set.all()  # Use prefetched answers
                students_dict[student_id]['evaluation'].append({
                    "id": assessment.id,
                    "question": {
                        **QuestionListTableSerializer(question).data,
                        "answers": AnswerSerializer(answers, many=True).data
                    },
                    "student_answer": assessment.student_answer,
                })
            # Convert dictionary to list and sort evaluations by 'id'
            obj_student = list(students_dict.values())
            for student in obj_student:
                student['evaluation'].sort(key=lambda x: x['id'])

            return Response(obj_student, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)