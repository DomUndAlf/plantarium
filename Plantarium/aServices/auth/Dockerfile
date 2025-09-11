FROM node:20-alpine
WORKDIR /app

COPY aServices/auth/package*.json ./
RUN npm install


COPY aServices/auth ./auth
COPY shared ./shared

WORKDIR /app/auth

RUN npx prisma generate --schema=../shared/prisma/schema.prisma
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]