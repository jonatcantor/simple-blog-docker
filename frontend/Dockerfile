FROM nginx:1.25-alpine

# Copiar configuración personalizada
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar solo archivos necesarios
COPY index.html style.css app.js /usr/share/nginx/html/

# Establecer permisos de solo lectura para contenido
RUN chmod -R 555 /usr/share/nginx/html

EXPOSE 80
