import { Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";

const individualPlantsRouter = Router();

individualPlantsRouter.get("/me/garden/individual-plants", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const plants = await prisma.individual_plants.findMany({
      where: { user_id: decoded.id },
      include: { plants: true }, // bringt alle Stammdaten mit
    });

    res.json(plants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Laden der Einzelpflanzen" });
  }
});


individualPlantsRouter.post("/me/garden/individual-plants", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const {
      x_position,
      y_position,
      planting_date,
      plantData, 
    } = req.body;

    const newIndividual = await prisma.individual_plants.create({
    data: {
        x_position,
        y_position,
        planting_date: new Date(planting_date),
        users: { connect: { id: decoded.id } },
        plants: { create: plantData },
      },
      include: { plants: true },
    });

    res.json(newIndividual);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Anlegen der Einzelpflanze" });
  }
});


individualPlantsRouter.put("/me/garden/individual-plants/:plantId", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const plantId = Number(req.params.plantId);

    const { x_position, y_position, planting_date, watered } = req.body;

    const updated = await prisma.individual_plants.updateMany({
      where: { user_id: decoded.id, plant_id: plantId },
      data: {
        ...(x_position !== undefined && { x_position }),
        ...(y_position !== undefined && { y_position }),
        ...(planting_date && { planting_date: new Date(planting_date) }),
        ...(watered !== undefined && { watered }),
      },
    });

    if (updated.count === 0) return res.status(404).json({ error: "Pflanze nicht gefunden" });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Aktualisieren der Einzelpflanze" });
  }
});

individualPlantsRouter.delete("/me/garden/individual-plants/:plantId", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const plantId = Number(req.params.plantId);

    const deleted = await prisma.individual_plants.deleteMany({
      where: { user_id: decoded.id, plant_id: plantId },
    });

    if (deleted.count === 0) return res.status(404).json({ error: "Pflanze nicht gefunden" });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Löschen der Einzelpflanze" });
  }
});

export default individualPlantsRouter;
