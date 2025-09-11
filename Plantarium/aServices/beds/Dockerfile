FROM node:20-alpine
WORKDIR /app

COPY aServices/beds/package*.json ./
RUN npm install

COPY aServices/beds ./beds
COPY shared ./shared

WORKDIR /app/beds

RUN npx prisma generate --schema=../shared/prisma/schema.prisma
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
