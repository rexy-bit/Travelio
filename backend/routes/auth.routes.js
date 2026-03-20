import {Router} from "express"
import { getCurrentUser, signIn, signOut, signUp } from "../controllers/auth.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const authRouter = Router();


authRouter.post('/sign-up', signUp);

authRouter.post('/sign-in', signIn);
 
authRouter.post('/sign-out', signOut);

authRouter.get('/currentUser', authorize, getCurrentUser);


export default authRouter;