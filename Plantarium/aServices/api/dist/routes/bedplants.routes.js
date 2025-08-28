"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = require("../prismaClient");
const bedPlantsRouter = (0, express_1.Router)();
bedPlantsRouter.get("/:bedId/plants", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const bedId = Number(req.params.bedId);
        const bed = await prismaClient_1.prisma.beds.findFirst({
            where: { id: bedId, user_id: decoded.id },
        });
        if (!bed)
            return res.status(404).json({ error: "Beet nicht gefunden" });
        const plants = await prismaClient_1.prisma.bed_plants.findMany({
            where: { bed_id: bedId },
            include: { plants: true },
        });
        res.json(plants);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Laden der Beetpflanzen" });
    }
});
bedPlantsRouter.get("/plants", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const bedsWithPlants = await prismaClient_1.prisma.beds.findMany({
            where: { user_id: decoded.id },
            include: {
                bed_plants: {
                    include: { plants: true },
                },
            },
        });
        res.json(bedsWithPlants);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Laden aller Beetpflanzen" });
    }
});
bedPlantsRouter.post("/:bedId/plants", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const bedId = Number(req.params.bedId);
        const { planting_date, plantData } = req.body;
        const bed = await prismaClient_1.prisma.beds.findFirst({
            where: { id: bedId, user_id: decoded.id },
        });
        if (!bed)
            return res.status(404).json({ error: "Beet nicht gefunden" });
        const existingPlant = await prismaClient_1.prisma.bed_plants.findFirst({
            where: { bed_id: bedId },
        });
        if (existingPlant) {
            return res.status(400).json({ error: "In diesem Beet ist schon eine Pflanze vorhanden" });
        }
        const newEntry = await prismaClient_1.prisma.bed_plants.create({
            data: {
                planting_date: new Date(planting_date),
                beds: { connect: { id: bedId } },
                plants: { create: { ...plantData, growth_type: "bed", watered: false } },
            },
            include: { plants: true },
        });
        res.json(newEntry);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Anlegen der Beetpflanze" });
    }
});
bedPlantsRouter.put("/:bedId/plants/:plantId", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const bedId = Number(req.params.bedId);
        const plantId = Number(req.params.plantId);
        const { planting_date } = req.body;
        const bed = await prismaClient_1.prisma.beds.findFirst({
            where: { id: bedId, user_id: decoded.id },
        });
        if (!bed)
            return res.status(404).json({ error: "Beet nicht gefunden" });
        const updated = await prismaClient_1.prisma.bed_plants.update({
            where: { bed_id_plant_id: { bed_id: bedId, plant_id: plantId } },
            data: {
                ...(planting_date && { planting_date: new Date(planting_date) }),
            },
            include: { plants: true },
        });
        res.json(updated);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Aktualisieren der Beetpflanze" });
    }
});
bedPlantsRouter.delete("/:bedId/plants/:plantId", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const bedId = Number(req.params.bedId);
        const plantId = Number(req.params.plantId);
        const bed = await prismaClient_1.prisma.beds.findFirst({
            where: { id: bedId, user_id: decoded.id },
        });
        if (!bed)
            return res.status(404).json({ error: "Beet nicht gefunden" });
        const deleted = await prismaClient_1.prisma.bed_plants.delete({
            where: { bed_id_plant_id: { bed_id: bedId, plant_id: plantId } },
            include: { plants: true },
        });
        res.json(deleted);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Löschen der Beetpflanze" });
    }
});
exports.default = bedPlantsRouter;
