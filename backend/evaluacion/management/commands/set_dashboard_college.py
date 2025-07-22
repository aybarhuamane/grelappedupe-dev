import json
from django.core.management import BaseCommand
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Prefetch, Q
from educativa.models import (
    DetailInstitution,
    CourseAssignment,
    Course,
    Competence,
    Capacity,
    EducationalLevel
    

)
from core.models import Person
from evaluacion.models import Achievement, Assessment, Question
from educativa.serializers import DetailInstitutionSerializer,EducationalLevelSerializer
from core.serializers import UbigeoSerializer, PersonSerializer
from django.conf import settings
import os
import time
import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Genera y guarda un JSON con los datos del colegio"

    def add_arguments(self, parser):
        parser.add_argument(
            "--output",
            type=str,
            default="dashboardcollege.json",
            help="Nombre del archivo de salida JSON",
        )

    def _calculate_achievement_stats(self, assessments, achievements):
        """Helper method to calculate achievement statistics for a set of assessments."""
        if not assessments:
            return [], []

        # Get all questions and correct answers in one query
        questions = Question.objects.filter(
            id__in=assessments.values_list("question", flat=True).distinct()
        ).prefetch_related("answer_set")

        correct_answers = {
            q.id: q.answer_set.filter(is_correct=True).first().id
            for q in questions
            if q.answer_set.filter(is_correct=True).exists()
        }

        # Prepare student data
        student_data = {}
        for assessment in assessments:
            student_id = assessment.student_id
            question_id = assessment.question_id
            if student_id not in student_data:
                student_data[student_id] = {"questions": {}, "total_questions": 0}

            if question_id not in student_data[student_id]["questions"]:
                student_data[student_id]["questions"][question_id] = False
                student_data[student_id]["total_questions"] += 1

            # Check if answer is correct
            correct_answer_id = correct_answers.get(question_id)
            if correct_answer_id and assessment.student_answer == correct_answer_id:
                student_data[student_id]["questions"][question_id] = True

        # Calculate percentages and achievements
        students = []
        total_students = len(student_data)
        achievement_counts = {ach.id: 0 for ach in achievements}

        for student_id, data in student_data.items():
            correct_count = sum(
                1 for is_correct in data["questions"].values() if is_correct
            )
            total_questions = data["total_questions"]
            percentage = (
                (correct_count / total_questions * 100) if total_questions > 0 else 0
            )

            # Find matching achievement
            achievement = next(
                (
                    ach
                    for ach in achievements
                    if ach.worth_min <= percentage <= ach.worth_max
                ),
                None,
            )
            achievement_name = achievement.name if achievement else "Sin logro"

            students.append(
                {
                    "id": student_id,
                    "puntaje": correct_count,
                    "porcentaje": percentage,
                    "logro": achievement_name,
                }
            )

            if achievement:
                achievement_counts[achievement.id] += 1

        # Prepare achievement stats
        achievement_stats = []
        for ach in achievements:
            count = achievement_counts[ach.id]
            percentage = (
                round(count / total_students * 100, 2) if total_students > 0 else 0
            )
            achievement_stats.append(
                {
                    "id": ach.id,
                    "logro": ach.name,
                    "valor": percentage,
                    "total_alumnos": count,
                }
            )

        return students, achievement_stats

    def handle(self, *args, **options):
        start_time = time.time()
        try:
            output_file = options["output"]
            output_dir = os.path.join(settings.MEDIA_ROOT, "json")
            os.makedirs(output_dir, exist_ok=True)
            output_path = os.path.join(output_dir, output_file)

            # Prefetch all achievements once
            achievements = list(Achievement.objects.all().order_by("id"))

            # Optimized query for institutions and details
            institutions_data = []
            details = (
                DetailInstitution.objects.select_related("institution")
                .filter(~Q(institution__name__icontains="ANEXO"))
                .prefetch_related(
                    Prefetch(
                        "degree_set__courseassignment_set",
                        queryset=CourseAssignment.objects.select_related("course"),
                    )
                )
            )

            for detail in details:
                institution = detail.institution
                serialized_detail = DetailInstitutionSerializer(detail).data

                # Verificar si el colegio tiene director y agregar sus datos desde la tabla Persona
                director = getattr(detail, "director", None)
                director_data=None
                if director:
                    persona = director.person
                    director_data = PersonSerializer(persona).data
                
                # Agregar la información del director al detalle serializado
                serialized_detail["director"] = director_data

                level = getattr(detail, "level", None)
                level_data = None
                if level:
                    level_data=EducationalLevelSerializer(level).data

                serialized_detail["level"] = level_data


                # Get all courses for this institution
                courses = (
                    Course.objects.filter(
                        courseassignment__degree__detail_institution=detail
                    )
                    .distinct()
                    .prefetch_related(
                        Prefetch(
                            "competence_set",
                            queryset=Competence.objects.prefetch_related(
                                Prefetch(
                                    "capacity_set", queryset=Capacity.objects.all()
                                )
                            ),
                        )
                    )
                )

                courses_data = []
                for course in courses:
                    # Get course assignment (first one found)
                    course_assignment = CourseAssignment.objects.filter(
                        degree__detail_institution=detail, course=course
                    ).first()

                    if not course_assignment:
                        continue

                    competences_data = []
                    for competence in course.competence_set.all():
                        capacities_data = []

                        # Process capacities for this competence
                        for capacity in competence.capacity_set.all():
                            # Get assessments for this capacity
                            capacity_assessments = Assessment.objects.filter(
                                question__capacity=capacity,
                                course_assignment__degree__detail_institution=detail,
                            ).select_related("student", "question")

                            _, capacity_achievement_stats = (
                                self._calculate_achievement_stats(
                                    capacity_assessments, achievements
                                )
                            )

                            capacities_data.append(
                                {
                                    "id": capacity.id,
                                    "capacidad": capacity.code,
                                    "logros": capacity_achievement_stats,
                                }
                            )

                        # Process competence-level assessments
                        competence_assessments = Assessment.objects.filter(
                            question__capacity__competence=competence,
                            course_assignment__degree__detail_institution=detail,
                        ).select_related("student", "question")

                        _, competence_achievement_stats = (
                            self._calculate_achievement_stats(
                                competence_assessments, achievements
                            )
                        )

                        competences_data.append(
                            {
                                "id": competence.id,
                                "competencia": competence.code,
                                "capacidades": capacities_data,
                                "logros": competence_achievement_stats,
                            }
                        )

                    courses_data.append(
                        {
                            "id": course.id,
                            "name": course.name,
                            "course_assignment_id": course_assignment.id,
                            "data": competences_data,
                        }
                    )

                institutions_data.append(
                    {
                        "institution": {
                            "id": institution.id,
                            "name": institution.name,
                            "address": institution.address,
                            'ubigeo': UbigeoSerializer(institution.ubigeo).data
                        },
                        "detailinstitution": serialized_detail,
                        "cursos": courses_data,
                    }
                )

            # Write to file
            with open(output_path, "w", encoding="utf-8") as f:
                json.dump(
                    institutions_data,
                    f,
                    ensure_ascii=False,
                    indent=4,
                    cls=DjangoJSONEncoder,
                )
            execution_time = time.time() - start_time
            logger.info(
                "Dashboard_college completado. Tiempo: %.4f segundos. Items originales: %d",
                execution_time,
                len(details),
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f"Archivo JSON generado correctamente: {output_path}"
                )
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f"Tiempo de ejecución: {execution_time:.2f} segundos"
                )
            )

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error: {str(e)}"))
        finally:
            self.stdout.write(self.style.WARNING("Proceso finalizado."))
