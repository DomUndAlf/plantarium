FROM node:20-alpine
WORKDIR /app

COPY aServices/weather/package*.json ./
RUN npm install

COPY aServices/weather ./weather
COPY shared ./shared

WORKDIR /app/weather

RUN npx prisma generate --schema=../shared/prisma/schema.prisma
RUN npm run build && ls -R /app/weather && ls -R /app

EXPOSE 3000
CMD ["node", "../dist/aServices/weather/src/index.js"]
