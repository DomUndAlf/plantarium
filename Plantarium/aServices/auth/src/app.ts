import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import "./passport";         
import { setupSwagger } from "./swagger";


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/health", (_req, res) => res.json({ ok: true, service: "auth" }));

app.use("/users", userRouter);

setupSwagger(app);

export default app;
