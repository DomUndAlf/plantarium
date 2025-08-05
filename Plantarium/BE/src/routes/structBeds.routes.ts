import { Router } from "express";
import { prisma } from "../prismaClient";
import jwt from "jsonwebtoken";

const surfaceRouter = Router();

surfaceRouter.post("/me/garden/surfaces", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const {
      type,
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

    const newSurface = await prisma.surfaces.create({
      data: {
        user_id: decoded.id,
        type,
        x_position,
        y_position,
        width,
        height,
      },
    });

    res.status(201).json({ data: newSurface });
  } catch (error) {
    console.error("Fehler beim Erstellen der Fläche:", error);
    res.status(500).json({ error: "Fehler beim Erstellen der Fläche" });
  }
});


surfaceRouter.get("/me/garden/surfaces", async (req, res) => {
  const token = req.cookies?.jwt;
     if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
  
  const structures = await prisma.surfaces.findMany({
      where: { user_id: decoded.id },
    });

    res.json({ data: structures });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Laden der Flächen" });
  }
});

surfaceRouter.put("/me/garden/surfaces/:id", async (req, res) => {
    const token = req.cookies?.jwt;
     if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });
  try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const userId = decoded.id;

    const surfaceId = parseInt(req.params.id);
    const {
      type,
      x_position,
      y_position,
      width,
      height,
    } = req.body;

    const updated = await prisma.surfaces.updateMany({
      where: {
        id: surfaceId,
        user_id: userId,
      },
      data: {
        type,
        x_position,
        y_position,
        width,
        height,
      },
    });

    res.json({ updated });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Aktualisieren" });
  }
});

surfaceRouter.delete("/me/garden/surfaces/:id", async (req, res) => {
    const token = req.cookies?.jwt;
     if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });
         try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const userId = decoded.id;
    const surfaceId = parseInt(req.params.id);

    const deleted = await prisma.surfaces.deleteMany({
      where: {
        id: surfaceId,
        user_id: userId,
      },
    });

    res.json({ deleted });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Löschen" });
  }
});

