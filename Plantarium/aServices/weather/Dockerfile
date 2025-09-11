FROM node:20-alpine
WORKDIR /app

COPY aServices/weather/package*.json ./
RUN npm install

COPY aServices/weather ./weather
COPY shared ./shared


WORKDIR /app/weather

RUN npx prisma generate --schema=../shared/prisma/schema.prisma
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
