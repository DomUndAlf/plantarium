
import dotenv from "dotenv";
import path from "path";
import express from "express";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API-Service läuft auf http://localhost:${PORT}`);
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "weather" });
});
