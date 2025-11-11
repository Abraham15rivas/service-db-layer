# ----------------------------------------------------
# STAGE 1: BUILD (Compilación de TypeScript con NestJS)
# ----------------------------------------------------
FROM node:22-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de dependencia
COPY package*.json ./

# Instala todas las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el código TypeScript a JavaScript usando NestJS
RUN npm run build && ls -la dist

# ----------------------------------------------------
# STAGE 2: PRODUCTION (Imagen Final Optimizada)
# ----------------------------------------------------
FROM node:22-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia solo los archivos necesarios para producción
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expone el puerto que usa NestJS
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/src/main.js"]
