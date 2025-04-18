import { Router} from "express";
import { getAllUsers } from "./app";

const userRouter = Router();

userRouter.get('/', getAllUsers);

export default userRouter;
