FROM node:20
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install
COPY backend/ .
RUN npm run build
EXPOSE 5000
CMD ["node", "dist/main.js"]
