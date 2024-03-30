import express, { Request, Response, NextFunction } from "express";
import { VandorLogin, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, AddFood, GetFoods } from "../controllers/VandorController";
import { Authenticate } from "../middlewares/CommonAuth";

const router = express.Router();

router.post('/login', VandorLogin);
router.use(Authenticate)
router.get('/profile', GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/service', UpdateVandorService);
router.post('/food', AddFood);
router.get('/foods', GetFoods);
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from Admin'})
});

export { router as VandorRoute };