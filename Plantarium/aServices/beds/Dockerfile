FROM node:20-alpine
WORKDIR /app

COPY aServices/beds/package*.json ./
RUN npm install

COPY aServices/beds ./beds
COPY shared ./shared

WORKDIR /app/beds

RUN npx prisma generate --schema=../shared/prisma/schema.prisma
RUN npm run build && cp -r src/swagger dist/beds/src/swagger

EXPOSE 3000
CMD ["node", "dist/beds/src/index.js"]
