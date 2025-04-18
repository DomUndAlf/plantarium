# Basis-Image
FROM node:18-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Abhängigkeiten kopieren
COPY package*.json ./
COPY prisma ./prisma
RUN npm install

# Restliche Projektdateien kopieren
COPY . .
RUN npx prisma generate
# Standard-Port setzen (optional)
ENV PORT=3001

# Server starten
CMD ["npm", "start"]
