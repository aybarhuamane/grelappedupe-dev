from django.db import models
from core.models import Person, Ubigeo, BaseModel
# Create your models here.

class Director(BaseModel):
    person = models.OneToOneField(Person, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.person.name} {self.person.last_name}'
    
class Teaching(BaseModel):
    person = models.OneToOneField(Person, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.person.name} {self.person.last_name}'

class Category(models.Model):
    name = models.CharField(max_length=50)
    is_active= models.BooleanField(default=True)

    def __str__(self):
        return f'{self.name}'
    
class Area(models.Model):
    name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f'{self.name}'

class Modality(models.Model):
    name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f'{self.name}'
    
class EducationalLevel(models.Model):
    name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    modality = models.ForeignKey(Modality, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.name}-Modalidad:{self.modality.name}'
    
class Institution(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    ubigeo = models.ForeignKey(Ubigeo, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}-{self.address}'

class DetailInstitution(models.Model):
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    director = models.ForeignKey(Director, on_delete=models.CASCADE, null=True, blank=True)
    local_code = models.CharField(max_length=10)
    modular_code = models.CharField(max_length=10)
    level = models.ForeignKey(EducationalLevel, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,null=True, blank=True)
    area = models.ForeignKey(Area, on_delete=models.CASCADE, null=True, blank=True)
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'{self.institution.name}-{self.level.name}-{self.local_code}-{self.modular_code}'
    
class Degree(models.Model):
    degree_text = models.CharField(max_length=50)
    degree_number = models.CharField(max_length=5)
    section = models.CharField(max_length=5)
    is_active = models.BooleanField(default=True)
    detail_institution = models.ForeignKey(DetailInstitution, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.degree_text}-{self.detail_institution.institution.name}'

class Course(models.Model):
    name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.name}'
    
class Competence(models.Model):
    name = models.CharField(max_length=250)
    is_active = models.BooleanField(default=True)
    code = models.CharField(max_length=10, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}-Curso:{self.course.name}'

class Capacity(models.Model):
    name = models.CharField(max_length=350, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    code = models.CharField(max_length=10, null=True, blank=True)
    competence = models.ForeignKey(Competence, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}-Curso:{self.competence.name}'
    
class CourseAssignment(models.Model):
    teaching = models.ForeignKey(Teaching, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    degree = models.ForeignKey(Degree, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_validated = models.BooleanField(default=False)
    is_sent = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.teaching.person.name} {self.teaching.person.last_name}-{self.course.name}'

class Student(models.Model):
    gender_choices = [
        ('M', 'Masculino'),
        ('F', 'Femenino')
    ]

    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    num_document = models.CharField(max_length=20, unique=True)
    gender = models.CharField(max_length=1, choices=gender_choices, null=True, blank=True)
                              
    def __str__(self):
        return f'{self.num_document}-{self.name} {self.last_name}'
    
class TeacherInstitutionAssignment(models.Model):
    detail_institution = models.ForeignKey(DetailInstitution, on_delete=models.CASCADE)
    teaching = models.ForeignKey(Teaching, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f'{self.teaching.person.name} {self.teaching.person.last_name}-{self.detail_institution.institution.name}'