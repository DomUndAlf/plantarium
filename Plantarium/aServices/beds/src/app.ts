import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bedRouter from "./routes/bed.routes";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ ok: true, service: "beds" }));


app.use("/me/garden/beds", bedRouter);

export default app;
