
# Proyecto EVA

Este es el proyecto EVA, que incluye un backend construido con Django y un frontend con Next.js. La aplicación está dockerizada, lo que facilita la puesta en marcha en cualquier entorno. El frontend y el backend se comunican a través de la URL pública: [http://ip_public/](http://85.208.48.121/).

## Tabla de contenido

1. [Requisitos](#requisitos)
2. [Configuración](#configuración)
3. [Cómo levantar el proyecto](#cómo-levantar-el-proyecto)
4. [Cómo acceder a la aplicación](#cómo-acceder-a-la-aplicación)
5. [Detalles adicionales](#detalles-adicionales)

## Requisitos

Para ejecutar este proyecto necesitarás:

- Docker
- Docker Compose
- Un navegador web

## Configuración

Antes de levantar el proyecto, asegúrate de que tienes Docker y Docker Compose instalados.

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/aybarhuamane/grelappedupe-dev.git
   ```

2. **Accede al directorio del proyecto**:

   ```bash
   cd proyecto-eva
   ```

3. **Configura los archivos de entorno**:

   Si hay un archivo `.env` para variables de entorno (para el backend y/o frontend), asegúrate de que esté configurado correctamente. Revisa las variables relacionadas con la base de datos y otros servicios.

## Cómo levantar el proyecto

1. **Levantar los contenedores con Docker Compose**:

   Ejecuta el siguiente comando para levantar el backend, frontend, base de datos y Nginx:

   ```bash
   docker-compose up -d
   ```

   Esto descargará las imágenes necesarias (si no están ya presentes), construirá el proyecto y lo pondrá en marcha en segundo plano.

2. **Verificar los contenedores en ejecución**:

   Verifica que todos los contenedores estén corriendo correctamente:

   ```bash
   docker ps
   ```

   Debes ver algo como esto:

   ```bash
CONTAINER ID   IMAGE                   COMMAND                  CREATED      STATUS      PORTS                                             NAMES
49966daf9382   nginx:latest            "/docker-entrypoint.…"   5 days ago   Up 5 days   80/tcp, 0.0.0.0:443->443/tcp, [::]:443->443/tcp   nginx
66e7c8d50488   postgres:16             "docker-entrypoint.s…"   7 days ago   Up 2 days   0.0.0.0:32777->5432/tcp, [::]:32777->5432/tcp     postgres
9db97fd44e44   proyecto-eva-backend    "gunicorn --bind 0.0…"   8 days ago   Up 7 days   8000/tcp                                          django
d1af82e5eac4   proyecto-eva-frontend   "docker-entrypoint.s…"   8 days ago   Up 7 days   3000/tcp                                          nextjs

   ```

## Cómo acceder a la aplicación

Una vez que los contenedores estén corriendo, puedes acceder a la aplicación en:

- **Frontend (Next.js)**: [http://ip_public/](http://85.208.48.121/)
- **Backend (Django API)**: [http://ip_public/api/](http://85.208.48.121/api/)

El frontend y backend están en la misma URL. Nginx gestiona las rutas para servir correctamente el frontend y las solicitudes de API.

### ¿Qué esperar?

- El frontend debe mostrar la interfaz de usuario principal con un diseño moderno.
- Las solicitudes a la API deben funcionar desde la ruta `/api/`, y la API de Django debe responder.

### Verificación de los servicios:

Puedes verificar que los servicios están funcionando correctamente accediendo a estas rutas en un navegador web o usando herramientas como `curl` o Postman.

- **Verificar que la API de Django está corriendo**:

   ```bash
   curl http://ip_public/api/
   ```

## Detalles adicionales

- **Reiniciar los contenedores**: Si deseas reiniciar los contenedores, ejecuta:

  ```bash
  docker-compose restart
  ```

- **Detener los contenedores**: Para detener los contenedores, ejecuta:

  ```bash
  docker-compose down
  ```

- **Logs**: Para ver los logs de los contenedores, usa:

  ```bash
  docker-compose logs -f
  ```

### Contacto

Si tienes alguna duda o problema con la configuración, puedes contactarme en [desarrollo@devcloud.pe](aybarhuamane@gmail.com).
