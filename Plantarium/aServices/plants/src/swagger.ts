import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import YAML from "yamljs";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Plants Service API",
      version: "1.0.0",
      description: "API für einzelne Pflanzen",
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
  const plantsDoc = YAML.load(path.join(__dirname, "./swagger/plants.yaml"));

  const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Plantarium API",
      version: "1.0.0",
    },
     servers: [
      {
        url: process.env.VITE_PLANTS_URL,
        description: "Plants Service lokal",
      },
    ],
    paths: {
      ...plantsDoc.paths,
    },
    components: {
      ...plantsDoc.components,
    },
    tags: [
      ...(plantsDoc.tags || []),
    ],
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}