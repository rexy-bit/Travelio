import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { addReservation, annulerReservation, getReservationDetails, getUserReservations, userReservationsStats } from "../controllers/reservations.controller.js";

const reservationsRouter = Router();

reservationsRouter.post('/add', authorize, addReservation);

reservationsRouter.get('/user/:id', authorize, getUserReservations);

reservationsRouter.get('/statsUser/:id', authorize, userReservationsStats);

reservationsRouter.get('/details/:id', authorize, getReservationDetails);

reservationsRouter.put('/cancel/:id', authorize, annulerReservation);


export default reservationsRouter; 