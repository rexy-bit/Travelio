import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import { addHotel, deleteHotel, getHotels, updateHotel } from "../controllers/hotel.controller.js";



const hotelRouter = Router();

hotelRouter.post('/', authorize, isAdmin, getHotels);

hotelRouter.post('/add', authorize, isAdmin, addHotel);

hotelRouter.put('/update/:id', authorize, isAdmin, updateHotel);

hotelRouter.delete('/delete/:id', authorize, isAdmin, deleteHotel);

export default hotelRouter;

