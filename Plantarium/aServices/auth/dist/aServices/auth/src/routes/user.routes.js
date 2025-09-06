"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../../../../shared/prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRouter = (0, express_1.Router)();
userRouter.get('/me', async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: 'Nicht eingeloggt' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await prismaClient_1.default.users.findUnique({ where: { id: decoded.id } });
        if (!user)
            return res.status(404).json({ error: 'Nutzer nicht gefunden' });
        res.json({ data: user });
    }
    catch {
        res.status(401).json({ error: 'Ungültiges Token' });
    }
});
userRouter.put('/me/garden', async (req, res) => {
    // JWT wird aus den Cookies gelesen und verifiziert.
    // Die Nutzer-ID wird aus dem Token extrahiert.
    // Der entsprechende Nutzer wird aus der Datenbank geladen.
    // Falls kein Nutzer gefunden wird, wird 404 zurückgegeben.
    const token = req.cookies?.jwt;
    if (!token)
        return res.status(401).json({ error: 'Nicht eingeloggt' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //Anfragebody
        const { name, location, height, width } = req.body;
        //Validierung der typen plus alert zum aufploppen
        if (typeof name != "string" || typeof location != "string" || typeof height != "number" || typeof width != "number") {
            return res.status(400).json({ error: "Ungültiges Eingabeformat" });
        }
        //an Prismaschema senden mit richtigen Namen aus dem entity user
        const updatedUser = await prismaClient_1.default.users.update({
            where: { id: decoded.id },
            data: {
                name: name,
                location: location,
                height: height,
                width: width,
            },
        });
        //Antwort, fass ich das später als alert oder so aufploppen lassen will
        res.json({ message: "Garten aktualisiert", data: updatedUser });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ error: "Ungültiges Token oder anderer Fehler" });
    }
});
exports.default = userRouter;
