FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
COPY ../../shared ./shared

EXPOSE 3000

RUN npm run build

CMD ["node", "dist/index.js"]
