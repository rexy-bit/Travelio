import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { toggleFavorite } from "../controllers/favorites.controller.js";

const favoritesRouter = Router();


favoritesRouter.post("/toggle/:id", authorize, toggleFavorite);


export default favoritesRouter; 