import express, { Request, Response, NextFunction } from "express";
import { VandorLogin } from "../controllers/VandorController";

const router = express.Router();

router.post('/login', VandorLogin);
router.get('/profile');
router.patch('/profile');
router.patch('/service');
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from Admin'})
});

export { router as VandorRoute };