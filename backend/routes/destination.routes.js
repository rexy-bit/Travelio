import { Router } from "express";
import { addDestination, deleteDestination, getDestination, getDestinations , getUniqueCitiesAndCountries, searchDestination, updateDestination} from "../controllers/destination.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import multer from "multer";

const destinationRouter = Router();


const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/avif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, AVIF, and WEBP are allowed."));
    }
  },
});

destinationRouter.get('/', getDestinations);

destinationRouter.post('/search', searchDestination);
destinationRouter.get('/unique', getUniqueCitiesAndCountries);

destinationRouter.get('/:id', getDestination);

destinationRouter.post('/add', authorize, isAdmin,upload.array("images"), addDestination);

destinationRouter.put('/update/:id', authorize, isAdmin,upload.array("images"), updateDestination);

destinationRouter.delete('/delete/:id', authorize, isAdmin, deleteDestination);




export default destinationRouter;