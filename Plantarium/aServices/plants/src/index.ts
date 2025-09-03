import app from "./app";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Plants-Service läuft auf http://localhost:${PORT}`);
});
