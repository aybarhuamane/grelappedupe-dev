from django.db import transaction
from evaluacion.models import Question, Answer
from evaluacion.serializers import QuestionSerializer, AnswerSerializer
from rest_framework.response import Response
from rest_framework import status

def update_question_answer(self, request):
    try:
        with transaction.atomic():
            # Obtener la pregunta existente
            try:
                question = Question.objects.get(id=request.data.get('id', 0))
            except Question.DoesNotExist:
                return Response({
                    'message': 'La pregunta no existe!!!',
                }, status=status.HTTP_404_NOT_FOUND)

            # Validar y actualizar la pregunta
            question_serializer = QuestionSerializer(question, data=request.data, partial=True)
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

            # Validar y actualizar cada respuesta
            answers_data = request.data['answers']
            updated_answers = []
            for answer_data in answers_data:
                answer_id = answer_data.get('id')
                if answer_id:
                    # Si el ID de la respuesta existe, actualizar la respuesta existente
                    try:
                        answer = Answer.objects.get(id=answer_id, question=question)
                        answer_serializer = AnswerSerializer(answer, data=answer_data, partial=True)
                    except Answer.DoesNotExist:
                        return Response({
                            'message': f'La respuesta con ID {answer_id} no existe!!!',
                        }, status=status.HTTP_404_NOT_FOUND)
                else:
                    # Si no hay ID, crear una nueva respuesta
                    answer_data['question'] = question.id
                    answer_serializer = AnswerSerializer(data=answer_data)

                if not answer_serializer.is_valid():
                    return Response({
                        'message': 'Error de Validación en una de las Respuestas!!!',
                        'details': answer_serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                answer = answer_serializer.save()
                updated_answers.append(answer_serializer.data)

            return Response({
                'message': 'Pregunta y Respuestas actualizadas exitosamente!!!',
                'question': question_serializer.data,
                'answers': updated_answers
            }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'message': 'Error de Servidor!!!',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)