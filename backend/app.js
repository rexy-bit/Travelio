import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import { test } from "./test.js";
import authRouter from "./routes/auth.routes.js";
import destinationRouter from "./routes/destination.routes.js";
import tripRouter from "./routes/trip.routes.js";
import reservationsRouter from "./routes/reservations.routes.js";
import favoritesRouter from "./routes/favorites.routes.js";
import usersRouter from "./routes/users.routes.js";

 const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get('/', (req, res)=>res.send("Welcome to Travelio"));


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/destination', destinationRouter);
app.use('/api/v1/trips', tripRouter);
app.use('/api/v1/reservations', reservationsRouter);
app.use('/api/v1/favorites', favoritesRouter);
app.use('/api/v1/users', usersRouter);


app.listen(PORT, async() => {
    console.log(`App running on : http://localhost:${PORT}`);

    await test();
});
