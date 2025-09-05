import { Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";

const bedRouter = Router();


bedRouter.post("/", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const { x_position, y_position, width, height } = req.body;

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

// Alle Beete des Users laden
bedRouter.get("/", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const beds = await prisma.beds.findMany({
      where: { user_id: decoded.id },
      include: {
        bed_plants: {
          include: { plants: true },
        },
      },
    });

    res.json({ data: beds });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Laden der Beete" });
  }
});


bedRouter.put("/:id", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const userId = decoded.id;
    const bedId = parseInt(req.params.id);

    const { x_position, y_position, width, height } = req.body;

    const updated = await prisma.beds.update({
      where: { id: bedId, user_id: userId },
      data: { x_position, y_position, width, height },
    });

    res.json({ updated });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Aktualisieren" });
  }
});


bedRouter.delete("/:id", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const userId = decoded.id;
    const bedId = parseInt(req.params.id);

    const deleted = await prisma.beds.deleteMany({
      where: { id: bedId, user_id: userId },
    });

    if (deleted.count === 0) {
      return res
        .status(404)
        .json({ error: "Beet nicht gefunden oder keine Berechtigung" });
    }

    res.json({ deleted });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Löschen" });
  }
});


bedRouter.get("/:bedId/plants", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const bedId = Number(req.params.bedId);

    const bed = await prisma.beds.findFirst({
      where: { id: bedId, user_id: decoded.id },
    });
    if (!bed) return res.status(404).json({ error: "Beet nicht gefunden" });

    const plants = await prisma.bed_plants.findMany({
      where: { bed_id: bedId },
      include: { plants: true },
    });

    res.json(plants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Laden der Beetpflanzen" });
  }
});


bedRouter.post("/:bedId/plants", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const bedId = Number(req.params.bedId);
    const { planting_date, plantData } = req.body;

    const bed = await prisma.beds.findFirst({
      where: { id: bedId, user_id: decoded.id },
    });
    if (!bed) return res.status(404).json({ error: "Beet nicht gefunden" });

    // optional: nur eine Pflanze pro Beet zulassen
    const existingPlant = await prisma.bed_plants.findFirst({
      where: { bed_id: bedId },
    });
    if (existingPlant) {
      return res
        .status(400)
        .json({ error: "In diesem Beet ist schon eine Pflanze vorhanden" });
    }
    console.log({
  ...plantData,
  last_watered: new Date("2000-01-01T00:00:00.000Z"),
});
    const newEntry = await prisma.bed_plants.create({
      data: {
        planting_date: new Date(planting_date),
        beds: { connect: { id: bedId } },
        plants: {
          create: { ...plantData, growth_type: "bed", watered: false },
        },
      },
      include: { plants: true },
    });

    res.json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Anlegen der Beetpflanze" });
  }
});

bedRouter.put("/:bedId/plants/:plantId", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const bedId = Number(req.params.bedId);
    const plantId = Number(req.params.plantId);
    const { planting_date } = req.body;

    const bed = await prisma.beds.findFirst({
      where: { id: bedId, user_id: decoded.id },
    });
    if (!bed) return res.status(404).json({ error: "Beet nicht gefunden" });

    const updated = await prisma.bed_plants.update({
      where: { bed_id_plant_id: { bed_id: bedId, plant_id: plantId } }, // ⚠️ nur wenn Composite Key existiert
      data: {
        ...(planting_date && { planting_date: new Date(planting_date) }),
      },
      include: { plants: true },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Aktualisieren der Beetpflanze" });
  }
});

bedRouter.delete("/:bedId/plants/:plantId", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const bedId = Number(req.params.bedId);
    const plantId = Number(req.params.plantId);

    const bed = await prisma.beds.findFirst({
      where: { id: bedId, user_id: decoded.id },
    });
    if (!bed) return res.status(404).json({ error: "Beet nicht gefunden" });

    const deleted = await prisma.bed_plants.delete({
      where: { bed_id_plant_id: { bed_id: bedId, plant_id: plantId } }, // oder id: plantId, falls dein Schema eigenes PK hat
      include: { plants: true },
    });

    res.json(deleted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Löschen der Beetpflanze" });
  }
});

export default bedRouter;
