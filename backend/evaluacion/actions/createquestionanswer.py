from django.db import transaction
from evaluacion.models import Question, Answer
from evaluacion.serializers import QuestionSerializer, AnswerSerializer
from rest_framework.response import Response
from rest_framework import status

def create_question_answer(self, request):
    try:
        with transaction.atomic():
            question_serializer = QuestionSerializer(data=request.data)
            if not question_serializer.is_valid():
                return Response({
                    'message': 'Error de Validación en la Pregunta!!!',
                    'details': question_serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
            
            question = question_serializer.save()

            # Verificar si hay respuestas en los datos de la solicitud
            if 'answers' not in request.data or not isinstance(request.data['answers'], list):
                return Response({
                    'message': 'Se esperaba una lista de respuestas en el campo "answers"!!!',
                }, status=status.HTTP_400_BAD_REQUEST)

            #Validar y crear cada respuesta
            answers_data = request.data['answers']
            created_answers = []
            for answer_data in answers_data:
                answer_data['question'] = question.id  # Asociar la respuesta a la pregunta creada
                answer_serializer = AnswerSerializer(data=answer_data)
                if not answer_serializer.is_valid():
                    return Response({
                        'message': 'Error de Validación en una de las Respuestas!!!',
                        'details': answer_serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                answer = answer_serializer.save()
                created_answers.append(answer_serializer.data)

            return Response({
                'message': 'Pregunta y Respuestas creadas exitosamente!!!',
                'question': question_serializer.data,
                'answers': created_answers
            }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)