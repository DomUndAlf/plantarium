import { Router} from "express";
import { getAllUsers, getUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/users/:id', getUser);

export default userRouter;
