"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = require("../prismaClient");
const bedRouter = (0, express_1.Router)();
bedRouter.post("/", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { x_position, y_position, width, height, } = req.body;
        if (typeof x_position !== "number" ||
            typeof y_position !== "number" ||
            typeof width !== "number" ||
            typeof height !== "number") {
            return res.status(400).json({ error: "Ungültige Eingabedaten" });
        }
        const newBed = await prismaClient_1.prisma.beds.create({
            data: {
                user_id: decoded.id,
                x_position,
                y_position,
                width,
                height,
            },
        });
        res.status(201).json({ data: newBed });
    }
    catch (error) {
        console.error("Fehler beim Erstellen des Beets:", error);
        res.status(500).json({ error: "Fehler beim Erstellen des Beets" });
    }
});
bedRouter.get("/", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const beds = await prismaClient_1.prisma.beds.findMany({
            where: { user_id: decoded.id },
            include: {
                bed_plants: {
                    include: {
                        plants: true,
                    },
                },
            },
        });
        res.json({ data: beds });
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Laden der Beete" });
    }
});
bedRouter.put("/:id", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const bedId = parseInt(req.params.id);
        const { x_position, y_position, width, height, } = req.body;
        const updated = await prismaClient_1.prisma.beds.update({
            where: {
                id: bedId,
                user_id: userId,
            },
            data: {
                x_position,
                y_position,
                width,
                height,
            },
        });
        res.json({ updated });
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Aktualisieren" });
    }
});
bedRouter.delete("/:id", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const bedId = parseInt(req.params.id);
        const deleted = await prismaClient_1.prisma.beds.deleteMany({
            where: {
                id: bedId,
                user_id: userId,
            },
        });
        if (deleted.count === 0) {
            return res.status(404).json({ error: "Fläche nicht gefunden oder keine Berechtigung" });
        }
        res.json({ deleted });
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Löschen" });
    }
});
exports.default = bedRouter;
