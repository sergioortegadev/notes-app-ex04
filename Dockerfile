# Etapa 1: Construcción del frontend
FROM node:20 AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Etapa 2: Construcción del backend y combinación con el frontend
FROM node:20
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
# Copiar el frontend construido a la carpeta correcta para el backend
COPY --from=build-frontend /app/frontend/dist /app/frontend/dist
RUN npm run build
EXPOSE 5000
CMD ["node", "dist/main.js"]
