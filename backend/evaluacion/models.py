from django.db import models
from educativa.models import CourseAssignment, Capacity, Student,EducationalLevel
from core.models import Period


class Achievement(models.Model):
    name = models.CharField(max_length=50)
    worth_min = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    worth_max = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.name}'
    
class Question(models.Model):
    code = models.CharField(max_length=10)
    question = models.CharField(max_length=200, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    capacity = models.ForeignKey(Capacity, on_delete=models.CASCADE)
    degree_number = models.CharField(max_length=5, null=True, blank=True)
    level = models.ForeignKey(EducationalLevel, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'{self.code}-{self.question}' 
    
class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    option = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.question.code}-{self.answer}'
    
class Assessment(models.Model):
    date = models.DateField(auto_now_add=True)
    period = models.ForeignKey(Period, on_delete=models.CASCADE)
    course_assignment = models.ForeignKey(CourseAssignment, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    student_age = models.IntegerField(default=0)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    student_answer = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f'{self.student.name} {self.student.last_name}-{self.course_assignment.course.name}-{self.student_answer}'