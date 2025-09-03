import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import individualPlantsRouter from "./routes/plants.router";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ ok: true, service: "plants" }));

app.use("/me/garden/individual-plants", individualPlantsRouter);


export default app;
