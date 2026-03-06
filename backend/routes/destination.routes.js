import { Router } from "express";


const destinationRouter = Router();

destinationRouter.get('/', (req, res)=>res.sed("Get destinations"));

destinationRouter.post('/add', (req, res)=>res.send("Add destination"));

destinationRouter.put('/update', (req, res)=>res.send("Update destination"));

destinationRouter.delete('/delete/:id', (req, res)=>res.send("Delete destination"));


export default destinationRouter;