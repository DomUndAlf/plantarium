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


individualPlantsRouter.delete("/:plant_id/:x_position/:y_position", async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const { plant_id, x_position, y_position } = req.params;

    const deleted = await prisma.individual_plants.delete({
      where: {
        user_id_plant_id_x_position_y_position: {
          user_id: decoded.id,
          plant_id: Number(plant_id),
          x_position: Number(x_position),
          y_position: Number(y_position),
        },
      },
    });

    res.json(deleted);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Pflanze nicht gefunden" });
  }
});


export default individualPlantsRouter;
