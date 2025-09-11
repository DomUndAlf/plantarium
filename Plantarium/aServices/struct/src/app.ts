import express from "express";
import surfaceRouter from "./routes/structBeds.routes";
import { setupSwagger } from "./swagger";

const app = express();

app.get("/health", (_req, res) => res.json({ ok: true, service: "api" }));

app.use("/me/garden/surfaces", surfaceRouter);

setupSwagger(app);

export default app;
