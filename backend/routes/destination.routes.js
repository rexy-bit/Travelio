import { Router } from "express";
import { getDestination, getDestinations , getUniqueCitiesAndCountries} from "../controllers/destination.controller.js";


const destinationRouter = Router();

destinationRouter.get('/', getDestinations);

destinationRouter.get('/unique', getUniqueCitiesAndCountries);

destinationRouter.get('/:id', getDestination);

destinationRouter.post('/add', (req, res)=>res.send("Add destination"));

destinationRouter.put('/update', (req, res)=>res.send("Update destination"));

destinationRouter.delete('/delete/:id', (req, res)=>res.send("Delete destination"));


export default destinationRouter;