import { Router, Request, Response} from "express";
import { getAllUsers, getUser } from "../controllers/userController";
import { prisma } from "../prismaClient";
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

userRouter.get('', getAllUsers);
userRouter.get('/:id', getUser);

export default userRouter;
