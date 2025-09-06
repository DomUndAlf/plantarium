"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../../../../shared/prismaClient"));
const types_1 = require("../../../../shared/prisma/types");
const individualPlantsRouter = (0, express_1.Router)();
individualPlantsRouter.get("/", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const plants = await prismaClient_1.default.individual_plants.findMany({
            where: { user_id: decoded.id },
            include: { plants: true }, // Stammdaten mitliefern
        });
        res.json(plants);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Laden der Einzelpflanzen" });
    }
});
individualPlantsRouter.post("/", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { x_position, y_position, planting_date, plantData } = req.body;
        if (!plantData?.name || !plantData?.watering_interval) {
            return res
                .status(400)
                .json({ error: "Name und Wasserbedarf sind erforderlich" });
        }
        let plant = await prismaClient_1.default.plants.findFirst({
            where: {
                name: plantData.name,
                watering_interval: plantData.watering_interval,
                growth_type: types_1.plants_growth_type.single,
            },
        });
        if (!plant) {
            plant = await prismaClient_1.default.plants.create({
                data: {
                    name: plantData.name,
                    watering_interval: Number(plantData.watering_interval),
                    growth_type: types_1.plants_growth_type.single,
                    last_watered: new Date("2000-01-01T00:00:00.000Z"),
                },
            });
        }
        const newIndividual = await prismaClient_1.default.individual_plants.create({
            data: {
                user_id: decoded.id,
                plant_id: plant.id,
                x_position: Number(x_position),
                y_position: Number(y_position),
                planting_date: new Date(planting_date),
                last_watered: new Date("2000-01-01T00:00:00.000Z"),
            },
            include: { plants: true },
        });
        res.json(newIndividual);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Anlegen der Einzelpflanze" });
    }
});
individualPlantsRouter.delete("/:plant_id/:x_position/:y_position", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { plant_id, x_position, y_position } = req.params;
        const deleted = await prismaClient_1.default.individual_plants.delete({
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
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ error: "Pflanze nicht gefunden" });
    }
});
exports.default = individualPlantsRouter;
