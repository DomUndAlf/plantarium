FROM node:20-alpine
WORKDIR /app

COPY aServices/weather/package*.json ./
RUN npm install

COPY aServices/weather ./weather
COPY shared ./shared

WORKDIR /app/weather

RUN npx prisma generate --schema=../shared/prisma/schema.prisma
RUN npm run build && RUN cp -r src/swagger dist/weather/src/swagger

EXPOSE 3000
CMD ["node", "dist/weather/src/index.js"]
