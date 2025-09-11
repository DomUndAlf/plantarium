FROM node:20-alpine
WORKDIR /app

COPY aServices/struct/package*.json ./
RUN npm install

COPY aServices/struct ./struct
COPY shared ./shared

WORKDIR /app/struct

RUN npx prisma generate --schema=../shared/prisma/schema.prisma
RUN npm run build && mv /app/dist ./dist

EXPOSE 3000
CMD ["node", "struct/dist/index.js"]
