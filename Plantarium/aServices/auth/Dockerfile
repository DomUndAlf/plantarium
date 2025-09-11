FROM node:20-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# package.json und package-lock.json kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm ci --include=dev

# Restlichen Code kopieren
COPY . .
COPY ../../shared ./shared

# Prisma Client generieren + TS build
RUN npx prisma generate
RUN npm run build

# Port für den Container öffnen
EXPOSE 3000

# Startkommando
CMD ["node", "dist/index.js"]
