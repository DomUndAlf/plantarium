# Basis-Image
FROM node:20-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Abhängigkeiten kopieren
COPY package*.json ./
RUN npm install

# Restliche Projektdateien kopieren
COPY FE .

# App bauen (für Produktion) – oder auskommentieren, falls du `npm run dev` nutzen willst
COPY . .
RUN npm run build

FROM nginx:alpine
# React-Router: alle Routen auf index.html zurückfallen lassen
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Gebaute Dateien ins Nginx-HTML-Verzeichnis kopieren
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

# Dev-Server starten
CMD ["nginx", "-g", "daemon off;"]