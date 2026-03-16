import { Router } from "express";

const reservationsRouter = Router();

reservationsRouter.post('/add', (req, res)=>res.send("Add reservation"));


export default reservationsRouter;