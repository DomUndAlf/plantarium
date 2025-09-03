import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import surfaceRouter from "./routes/structBeds.routes";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ ok: true, service: "api" }));

app.use("/me/garden/surfaces", surfaceRouter);

export default app;
