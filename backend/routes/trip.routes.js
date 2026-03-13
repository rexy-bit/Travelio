import { Router } from "express";
import { getTrips } from "../controllers/trip.controller.js";



const tripRouter = Router();


tripRouter.post('/', getTrips);

tripRouter.post('/add', (req, res)=>res.send("Add trip"));

tripRouter.put('/update/:id', (req, res)=>res.send("Update Trip"));

tripRouter.delete('/delete/:id', (req, res)=>res.send("Delete trip"));


export default tripRouter;