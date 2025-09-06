"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const options = {
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function setupSwagger(app) {
    const usersDoc = yamljs_1.default.load(path_1.default.join(__dirname, "./swagger/users.yaml"));
    const authDoc = yamljs_1.default.load(path_1.default.join(__dirname, "./swagger/auth.yaml"));
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
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
}
