import { Router, Request, Response} from "express";
import { prisma } from "../prismaClient";
import jwt from "jsonwebtoken";

const userRouter = Router();

/**
 * GET /users/me
 * 
 * Liefert die Benutzerdaten des aktuell authentifizierten Users zurück.
 * 
 * Erwartet ein gültiges JWT im HttpOnly-Cookie `jwt`.
 * 
 * Ablauf:
 *  - JWT wird aus den Cookies gelesen und verifiziert.
 *  - Die Nutzer-ID wird aus dem Token extrahiert.
 *  - Der entsprechende Nutzer wird aus der Datenbank geladen.
 *  - Falls kein Nutzer gefunden wird, wird 404 zurückgegeben.
 *  - Bei erfolgreicher Authentifizierung und Nutzerfund werden die Nutzerdaten als JSON zurückgegeben. (id und shibboleth ID)
 *  - Falls kein oder ein ungültiger Token vorliegt, wird 401 Unauthorized zurückgegeben.
 * 
 * @param {Request} req - Express HTTP Request, erwartet Cookies mit JWT
 * @param {Response} res - Express HTTP Response, sendet JSON mit Userdaten oder Fehlermeldung
 * 
 * @returns {Promise<void>}
 */
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

//als nächstes: put /me mit name, location, height, width 


export default userRouter;
