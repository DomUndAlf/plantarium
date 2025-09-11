FROM node:20-alpine
WORKDIR /app

COPY aServices/struct/package*.json ./
RUN npm install --only=production

COPY aServices/struct ./struct
COPY shared ./shared

WORKDIR /app/struct
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
