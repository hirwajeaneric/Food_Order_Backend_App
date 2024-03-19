import express, { Request, Response, NextFunction } from "express";
import { VandorLogin, GetVandorProfile } from "../controllers/VandorController";
import { Authenticate } from "../middlewares/CommonAuth";

const router = express.Router();

router.post('/login', VandorLogin);
router.get('/profile', Authenticate, GetVandorProfile);
router.patch('/profile');
router.patch('/service');
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from Admin'})
});

export { router as VandorRoute };