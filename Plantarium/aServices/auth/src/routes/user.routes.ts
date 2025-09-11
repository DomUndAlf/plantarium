import { Router, Request, Response} from "express";
import prisma from "../../../shared/prismaClient";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.get('/me', async (req: Request, res: Response) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: 'Nicht eingeloggt' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await prisma.users.findUnique({ where: { id: decoded.id } });

    if (!user) return res.status(404).json({ error: 'Nutzer nicht gefunden' });

    res.json({ data: user });
  } catch {
    res.status(401).json({ error: 'Ungültiges Token' });
  }
});

userRouter.put('/me/garden', async (req: Request, res: Response) => {
// JWT wird aus den Cookies gelesen und verifiziert.
// Die Nutzer-ID wird aus dem Token extrahiert.
// Der entsprechende Nutzer wird aus der Datenbank geladen.
// Falls kein Nutzer gefunden wird, wird 404 zurückgegeben.
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ error: 'Nicht eingeloggt' });
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

//Anfragebody
    const {name, location, height, width} = req.body;

//Validierung der typen plus alert zum aufploppen
      if (
        typeof name != "string" || typeof location != "string" || typeof height != "number" || typeof width != "number"
      ) {
        return res.status(400).json({error: "Ungültiges Eingabeformat" });
      }

//an Prismaschema senden mit richtigen Namen aus dem entity user
      const updatedUser = await prisma.users.update({
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
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Ungültiges Token oder anderer Fehler" });
  }
});


export default userRouter;
