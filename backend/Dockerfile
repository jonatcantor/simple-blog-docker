FROM node:18-alpine

# Crear usuario no-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Crear directorio de trabajo y dar permisos
WORKDIR /usr/src/app
COPY package*.json ./

# Instalar dependencias en modo producción
RUN npm ci --only=production

# Copiar código
COPY . .

# Cambiar a usuario no-root
USER appuser

EXPOSE 4000
CMD ["node", "index.js"]
