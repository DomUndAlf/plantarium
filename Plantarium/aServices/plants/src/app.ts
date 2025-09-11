import express from "express";
import individualPlantsRouter from "./routes/plants.router";
import { setupSwagger } from "./swagger";

const app = express();

app.get("/health", (_req, res) => res.json({ ok: true, service: "plants" }));

app.use("/me/garden/individual-plants", individualPlantsRouter);

setupSwagger(app);

export default app;
