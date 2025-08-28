"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = require("../prismaClient");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const surfaceRouter = (0, express_1.Router)();
surfaceRouter.post("/", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { type, x_position, y_position, width, height, } = req.body;
        if (typeof x_position !== "number" ||
            typeof y_position !== "number" ||
            typeof width !== "number" ||
            typeof height !== "number") {
            return res.status(400).json({ error: "Ungültige Eingabedaten" });
        }
        const newSurface = await prismaClient_1.prisma.surfaces.create({
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
    }
    catch (error) {
        console.error("Fehler beim Erstellen der Fläche:", error);
        res.status(500).json({ error: "Fehler beim Erstellen der Fläche" });
    }
});
surfaceRouter.get("/", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const structures = await prismaClient_1.prisma.surfaces.findMany({
            where: { user_id: decoded.id },
        });
        res.json({ data: structures });
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Laden der Flächen" });
    }
});
surfaceRouter.put("/:id", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const surfaceId = parseInt(req.params.id);
        const { type, x_position, y_position, width, height, } = req.body;
        const updated = await prismaClient_1.prisma.surfaces.update({
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
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Aktualisieren" });
    }
});
surfaceRouter.delete("/:id", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: "Nicht eingeloggt" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const surfaceId = parseInt(req.params.id);
        const deleted = await prismaClient_1.prisma.surfaces.deleteMany({
            where: {
                id: surfaceId,
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
exports.default = surfaceRouter;
