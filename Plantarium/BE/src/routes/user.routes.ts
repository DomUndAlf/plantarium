import { Router} from "express";
import { getAllUsers, getUser } from "../controllers/userController";

const userRouter = Router();

userRouter.get('', getAllUsers);
userRouter.get(':id', getUser);

export default userRouter;
