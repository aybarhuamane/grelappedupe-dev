# Intranet Postgrado UNAP
## Backend Django
### Instalar Python >= 3.7 e instalar Virtualenv con pip de manera global
```
pip install virtualenv
django-admin startproject
python manage.py startapp

```
### Crear el Virtulenv en la misma carpeta del repositorio
```
virtualenv .venv
```
### activar el virtual env
``
source .venv/Scripts/activate
```
### Instalar los requerimientos del Proyecto
```
pip install -r requirements.txt
```
### Ejecutar las migraciones
```
python manage.py makemigrations
python manage.py migrate
```
### Crear un supuersusuario con permisos de administrador
```
python manage.py createsuperuser
User: 
Email: 
Password:
```
### Correr el Servidoras
```
python manage.py runserver 192.168.16.182:8003
python manage.py runserver 127.0.0.1:8003
daphne -b 192.168.16.184 -p 8000 backend.asgi:application
```

## Rutas
- localhost:8000
- localhost:8000/admin


### Seeders

Para ejecutar todos los comando necesarios del servicio se debe ejecutar

```
python manage.py set_program_service
```
