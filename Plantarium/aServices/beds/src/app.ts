import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bedRouter from "./routes/bed.routes";
import { setupSwagger } from "./swagger";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ ok: true, service: "beds" }));

app.use("/me/garden/beds", bedRouter);

setupSwagger(app);

export default app;
