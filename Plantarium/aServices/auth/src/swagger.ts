import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import YAML from "yamljs";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth Service API",
      version: "1.0.0",
      description: "API für Authentifizierung",
    },
  },
  apis: ["./swagger/*.yaml"],

};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  const usersDoc = YAML.load(path.join(__dirname, "./swagger/users.yaml"));
  const authDoc = YAML.load(path.join(__dirname, "./swagger/auth.yaml"));

  const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Plantarium API",
      version: "1.0.0",
    },
    paths: {
      ...usersDoc.paths,
      ...authDoc.paths,
    },
    components: {
      ...usersDoc.components,
      ...authDoc.components,
    },
    tags: [
      ...(usersDoc.tags || []),
      ...(authDoc.tags || []),
    ],
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}