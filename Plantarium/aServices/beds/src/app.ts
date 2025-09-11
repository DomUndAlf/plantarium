import express from "express";
import bedRouter from "./routes/bed.routes";
import { setupSwagger } from "./swagger";

const app = express();

app.get("/health", (_req, res) => res.json({ ok: true, service: "beds" }));

app.use("/me/garden/beds", bedRouter);

setupSwagger(app);

export default app;
