FROM node:20-alpine
WORKDIR /app

COPY aServices/auth/package*.json ./
RUN npm install


COPY aServices/auth ./auth
COPY shared ./shared

WORKDIR /app/auth

RUN npx --prefix /app prisma generate --schema=../shared/prisma/schema.prisma
RUN npm run build && cp -r src/swagger dist/auth/src/swagger 

EXPOSE 3000
CMD ["node", "dist/auth/src/index.js"]