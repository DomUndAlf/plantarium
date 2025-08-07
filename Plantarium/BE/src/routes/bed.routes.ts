import { Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";

const bedRouter = Router();

bedRouter.post("/me/garden/beds", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const {
      name,
      x_position,
      y_position,
      width,
      height,
    } = req.body;

    if (
      typeof x_position !== "number" ||
      typeof y_position !== "number" ||
      typeof width !== "number" ||
      typeof height !== "number"
    ) {
      return res.status(400).json({ error: "Ungültige Eingabedaten" });
    }

    const newBed = await prisma.beds.create({
      data: {
        user_id: decoded.id,
        x_position,
        y_position,
        width,
        height,
      },
    });

    res.status(201).json({ data: newBed });
  } catch (error) {
    console.error("Fehler beim Erstellen des Beets:", error);
    res.status(500).json({ error: "Fehler beim Erstellen des Beets" });
  }
});

export default bedRouter;
