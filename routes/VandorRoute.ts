import express, { Request, Response, NextFunction } from "express";
import { VandorLogin, GetVandorProfile, UpdateVandorProfile } from "../controllers/VandorController";
import { Authenticate } from "../middlewares/CommonAuth";

const router = express.Router();

router.post('/login', VandorLogin);
router.use(Authenticate)
router.get('/profile', GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/service');
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from Admin'})
});

export { router as VandorRoute };