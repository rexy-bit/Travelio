import { Router } from "express";
import { getDestinations } from "../controllers/destination.controller.js";


const destinationRouter = Router();

destinationRouter.get('/', getDestinations);

destinationRouter.post('/add', (req, res)=>res.send("Add destination"));

destinationRouter.put('/update', (req, res)=>res.send("Update destination"));

destinationRouter.delete('/delete/:id', (req, res)=>res.send("Delete destination"));


export default destinationRouter;