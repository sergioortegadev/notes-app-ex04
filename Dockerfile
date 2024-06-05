FROM node:20
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "dist/main.js" ]
