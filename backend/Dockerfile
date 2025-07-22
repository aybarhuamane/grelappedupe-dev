FROM python:3.12.5-slim

# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

EXPOSE 8000

ENV DJANGO_SETTINGS_MODULE=eva_api.settings

# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "eva_api.wsgi:application"]
CMD ["sh", "-c", "python manage.py migrate && gunicorn --bind 0.0.0.0:8000 eva_api.wsgi:application"]