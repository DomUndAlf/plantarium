import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import userRouter from "./user.routes";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/health", (_req, res) => res.json({ ok: true, service: "auth" }));

// Nur Auth/User-bezogene Endpunkte
app.use("/users", userRouter);

export default app;
