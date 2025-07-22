from django.db import models
# Create your models here.

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Person(BaseModel):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    num_document = models.CharField(max_length=20, unique=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'{self.name} {self.last_name}'

class Ubigeo(models.Model):
    code = models.CharField(max_length=10)
    region = models.CharField(max_length=100, null=True, blank=True)
    province = models.CharField(max_length=100, null=True, blank=True)
    district = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f'{self.code}-{self.region} - {self.province} - {self.district}'
    
class Period(models.Model):
    name = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.name}'