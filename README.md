# Blog Docker Multi-Container Project

Proyecto de ejemplo con 3 contenedores:
- **frontend**: Nginx sirviendo archivos estáticos (HTML/JS/CSS) y proxy a la API.
- **backend**: Node.js + Express que expone una API REST para posts.
- **db**: PostgreSQL 15 con volumen persistente y script de inicialización.

## Estructura
```
/frontend
  - index.html
  - app.js
  - style.css
  - nginx.conf
  - Dockerfile
/backend
  - package.json
  - index.js
  - Dockerfile
/db/init
  - init.sql
docker-compose.yml
README.md
```

## Requisitos
- Docker
- Docker Compose

## Usar
1. Clonar el repositorio.
   ```bash
   git clone https://github.com/jonatcantor/simple-blog-docker.git
   ```
3. Construir y levantar:
   ```bash
   docker compose up --build
   ```
4. Abrir en el navegador:
   - Frontend: http://localhost:8080
   - API (opcional, para pruebas): http://localhost:5000

## Endpoints principales (API)
- `GET /posts` -> Lista todas las entradas.
- `POST /posts` -> Crea una entrada. Body JSON: `{ "title": "...", "content": "..." }`
- `GET /health` -> Estado del servicio.

## Notas de implementación
- El frontend hace peticiones a `/api/*`. Nginx en el contenedor frontend proxy_pass a `http://backend:4000`.
- La base de datos se inicializa con `db/init/init.sql` (tabla `posts` y ejemplos).
- Datos persistentes en el volumen `db-data`.

## Comandos útiles
- Ver logs: `docker-compose logs -f`
- Listar contenedores: `docker ps`
- Acceder al shell del backend: `docker-compose exec backend sh`

