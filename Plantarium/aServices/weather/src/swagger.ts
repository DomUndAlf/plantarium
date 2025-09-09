import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import YAML from "yamljs";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Weather Service API",
      version: "1.0.0",
      description: "API für Wetterdaten",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./swagger/*.yaml"],

};

export function setupSwagger(app: Express) {
  const weatherDoc = YAML.load(path.join(__dirname, "./swagger/weather.yaml"));

  const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Plantarium API",
      version: "1.0.0",
    },
     servers: [
      {
        url: process.env.VITE_WEATHER_URL,
        description: "Structures Service lokal",
      },
    ],
    paths: {
      ...weatherDoc.paths,
    },
    components: {
      ...weatherDoc.components,
    },
    tags: [
      ...(weatherDoc.tags || []),
    ],
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}