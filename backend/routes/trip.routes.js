import { Router } from "express";



const tripRouter = Router();


tripRouter.get('/', (req, res)=>res.send("Get trips"));

tripRouter.post('/add', (req, res)=>res.send("Add trip"));

tripRouter.put('/update/:id', (req, res)=>res.send("Update Trip"));

tripRouter.delete('/delete/:id', (req, res)=>res.send("Delete trip"));


export default tripRouter;