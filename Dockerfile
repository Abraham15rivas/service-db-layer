# ----------------------------------------------------
# STAGE 1: BUILD (Compilación de TypeScript)
# ----------------------------------------------------
FROM node:20-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de dependencia (package.json y package-lock.json)
# Esto permite que Docker use el cache si los archivos no han cambiado
COPY package*.json ./

# Instala todas las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Compila el código TypeScript a JavaScript (dist)
RUN npm run build

# ----------------------------------------------------
# STAGE 2: PRODUCTION (Imagen Final Optimizada)
# ----------------------------------------------------
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia solo los archivos necesarios para producción desde la etapa 'builder'
# 1. Copia el package.json (para saber qué dependencias son necesarias)
COPY --from=builder /usr/src/app/package*.json ./
# 2. Copia la carpeta de código compilado 'dist'
COPY --from=builder /usr/src/app/dist ./dist

# Instala solo las dependencias de producción (--production)
RUN npm install --production

# Expone el puerto que usa NestJS
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD [ "node", "dist/main" ]