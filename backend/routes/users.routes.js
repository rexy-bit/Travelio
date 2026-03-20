import {Router} from "express"
import authorize from "../middlewares/auth.middleware.js";
import { modifyName } from "../controllers/users.controller.js";

const usersRouter = Router();


usersRouter.put("/modifyName/:id", authorize, modifyName);


export default usersRouter;