import { Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";

const bedPlantsRouter = Router();

bedPlantsRouter.get("/me/garden/beds/:bedId/plants", async (req, res) => {
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

bedPlantsRouter.post("/me/garden/beds/:bedId/plants", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const bedId = Number(req.params.bedId);

    const { plant_id, quantity, planting_date, plantData } = req.body;

    const bed = await prisma.beds.findFirst({
      where: { id: bedId, user_id: decoded.id },
    });
    if (!bed) return res.status(404).json({ error: "Beet nicht gefunden" });

    const newEntry = await prisma.bed_plants.create({
      data: {
        quantity,
        planting_date: new Date(planting_date),
        beds: { connect: { id: bedId } },
        ...(plant_id
          ? { plants: { connect: { id: plant_id } } }
          : { plants: { create: plantData } }),
      },
      include: { plants: true },
    });

    res.json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Anlegen der Beetpflanze" });
  }
});

bedPlantsRouter.put("/me/garden/beds/:bedId/plants/:plantId", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const bedId = Number(req.params.bedId);
    const plantId = Number(req.params.plantId);

    const { quantity, planting_date } = req.body;

    const bed = await prisma.beds.findFirst({
      where: { id: bedId, user_id: decoded.id },
    });
    if (!bed) return res.status(404).json({ error: "Beet nicht gefunden" });

    const updated = await prisma.bed_plants.update({
      where: { bed_id_plant_id: { bed_id: bedId, plant_id: plantId } },
      data: {
        ...(quantity !== undefined && { quantity }),
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

bedPlantsRouter.delete("/me/garden/beds/:bedId/plants/:plantId", async (req, res) => {
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
      where: { bed_id_plant_id: { bed_id: bedId, plant_id: plantId } },
      include: { plants: true },
    });

    res.json(deleted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Löschen der Beetpflanze" });
  }
});

export default bedPlantsRouter;
