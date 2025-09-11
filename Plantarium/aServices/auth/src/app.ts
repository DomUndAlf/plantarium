import express from "express";
import passport from "passport";
import userRouter from "./routes/user.routes";
import "./passport";         
import { setupSwagger } from "./swagger";


const app = express();

app.use(passport.initialize());

app.get("/health", (_req, res) => res.json({ ok: true, service: "auth" }));

app.use("/users", userRouter);

setupSwagger(app);

export default app;
