import { Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";
import { plants_growth_type } from "@prisma/client";

const individualPlantsRouter = Router();

individualPlantsRouter.get("/", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const plants = await prisma.individual_plants.findMany({
      where: { user_id: decoded.id },
      include: { plants: true }, // Stammdaten mitliefern
    });

    res.json(plants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Laden der Einzelpflanzen" });
  }
});

individualPlantsRouter.post("/", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const { x_position, y_position, planting_date, plantData } = req.body;

    if (!plantData?.name || !plantData?.watering_interval) {
      return res
        .status(400)
        .json({ error: "Name und Wasserbedarf sind erforderlich" });
    }

    let plant = await prisma.plants.findFirst({
      where: {
        name: plantData.name,
        watering_interval: plantData.watering_interval,
        growth_type: plants_growth_type.single,
      },
    });

    if (!plant) {
      plant = await prisma.plants.create({
        data: {
          name: plantData.name,
          watering_interval: Number(plantData.watering_interval),
          growth_type: plants_growth_type.single,
          watered: false,
        },
      });
    }

    const newIndividual = await prisma.individual_plants.create({
      data: {
        user_id: decoded.id,
        plant_id: plant.id,
        x_position: Number(x_position),
        y_position: Number(y_position),
        planting_date: new Date(planting_date),
        watered: false,
      },
      include: { plants: true },
    });

    res.json(newIndividual);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Anlegen der Einzelpflanze" });
  }
});

individualPlantsRouter.put("/", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const { plant_id, x_position, y_position, planting_date, watered } = req.body;

    if (
      plant_id === undefined ||
      x_position === undefined ||
      y_position === undefined
    ) {
      return res
        .status(400)
        .json({ error: "plant_id, x_position und y_position sind erforderlich" });
    }

    const updated = await prisma.individual_plants.updateMany({
      where: {
        user_id: decoded.id,
        plant_id: Number(plant_id),
        x_position: Number(x_position),
        y_position: Number(y_position),
      },
      data: {
        ...(planting_date && { planting_date: new Date(planting_date) }),
        ...(watered !== undefined && { watered }),
      },
    });

    if (updated.count === 0) {
      return res.status(404).json({ error: "Pflanze nicht gefunden" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Aktualisieren der Einzelpflanze" });
  }
});

individualPlantsRouter.delete("/", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const { plant_id, x_position, y_position } = req.body;

    if (
      plant_id === undefined ||
      x_position === undefined ||
      y_position === undefined
    ) {
      return res
        .status(400)
        .json({ error: "plant_id, x_position und y_position sind erforderlich" });
    }

    const deleted = await prisma.individual_plants.deleteMany({
      where: {
        user_id: decoded.id,
        plant_id: Number(plant_id),
        x_position: Number(x_position),
        y_position: Number(y_position),
      },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: "Pflanze nicht gefunden" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Löschen der Einzelpflanze" });
  }
});

export default individualPlantsRouter;
