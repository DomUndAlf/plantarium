
import dotenv from "dotenv";
import path from "path";
import express from "express";
import weatherRouter from "./routes/weather.router";
import cors from "cors";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./swagger";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use("/", weatherRouter);

app.listen(PORT, () => {
  console.log(`weather-Service läuft auf http://localhost:${PORT}`);
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "weather" });
});

setupSwagger(app);

