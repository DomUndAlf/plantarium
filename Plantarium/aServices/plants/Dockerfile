FROM node:20-alpine
WORKDIR /app

COPY aServices/plants/package*.json ./
RUN npm install

COPY aServices/plants ./plants
COPY shared ./shared

WORKDIR /app/plants

RUN npx prisma generate --schema=../shared/prisma/schema.prisma
RUN npm run build

EXPOSE 3000
CMD ["node", "plants/dist/index.js"]
