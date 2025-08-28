"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
require("./auth/passport"); // initialisiert Google-Strategie
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
app_1.default.use("/auth", auth_routes_1.default);
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`Auth-Service läuft auf http://localhost:${PORT}`);
});
