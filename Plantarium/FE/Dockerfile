# Basis-Image
FROM node:18-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Abhängigkeiten kopieren
COPY package*.json ./
RUN npm install

# Restliche Projektdateien kopieren
COPY . .

# Vite-Port (optional)
ENV PORT=3000

# App bauen (für Produktion) – oder auskommentieren, falls du `npm run dev` nutzen willst
RUN npm run build

# Dev-Server starten
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
