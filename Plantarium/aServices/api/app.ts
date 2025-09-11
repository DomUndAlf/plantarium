import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "../auth/src/routes/user.routes";
import authRouter from "../auth/src/routes/auth.routes";
import bedsRouter from "../beds/src/routes/bed.routes";
import plantsRouter from "../plants/src/routes/plants.router";
import structRouter from "../struct/src/routes/structBeds.routes";

const app = express();

app.use(cors({ 
  origin: "https://devstud.imn.htwk-leipzig.de", 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ ok: true, service: "api" }));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/beds", bedsRouter);
app.use("/plants", plantsRouter);
app.use("/structures", structRouter);

export default app;
