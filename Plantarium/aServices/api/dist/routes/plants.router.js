"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = require("../prismaClient");
const client_1 = require("@prisma/client");
const individualPlantsRouter = (0, express_1.Router)();
// 🟢 Alle individuellen Pflanzen holen
individualPlantsRouter.get("/", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const plants = await prismaClient_1.prisma.individual_plants.findMany({
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
// 🟢 Neue individuelle Pflanze anlegen
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
        // 1️⃣ prüfen, ob Sorte schon existiert
        let plant = await prismaClient_1.prisma.plants.findFirst({
            where: {
                name: plantData.name,
                watering_interval: plantData.watering_interval,
                growth_type: client_1.plants_growth_type.single,
            },
        });
        // 2️⃣ wenn nicht -> neue Sorte anlegen
        if (!plant) {
            plant = await prismaClient_1.prisma.plants.create({
                data: {
                    name: plantData.name,
                    watering_interval: Number(plantData.watering_interval),
                    growth_type: client_1.plants_growth_type.single,
                    watered: false,
                },
            });
        }
        // 3️⃣ individuellen Pflanzeneintrag anlegen
        const newIndividual = await prismaClient_1.prisma.individual_plants.create({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Anlegen der Einzelpflanze" });
    }
});
// 🟢 Pflanze updaten
individualPlantsRouter.put("/", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { plant_id, x_position, y_position, planting_date, watered } = req.body;
        if (plant_id === undefined ||
            x_position === undefined ||
            y_position === undefined) {
            return res
                .status(400)
                .json({ error: "plant_id, x_position und y_position sind erforderlich" });
        }
        const updated = await prismaClient_1.prisma.individual_plants.updateMany({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Aktualisieren der Einzelpflanze" });
    }
});
// 🟢 Pflanze löschen
individualPlantsRouter.delete("/", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { plant_id, x_position, y_position } = req.body;
        if (plant_id === undefined ||
            x_position === undefined ||
            y_position === undefined) {
            return res
                .status(400)
                .json({ error: "plant_id, x_position und y_position sind erforderlich" });
        }
        const deleted = await prismaClient_1.prisma.individual_plants.deleteMany({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Löschen der Einzelpflanze" });
    }
});
exports.default = individualPlantsRouter;
