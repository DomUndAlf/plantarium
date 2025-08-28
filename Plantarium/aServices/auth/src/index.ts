import app from "./app";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./auth.routes";
import "./passport";               

dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Auth-Service läuft auf http://localhost:${PORT}`);
});