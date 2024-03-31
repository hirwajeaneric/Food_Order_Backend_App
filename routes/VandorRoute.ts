import express, { Request, Response, NextFunction } from "express";
import { VandorLogin, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, AddFood, GetFoods, UpdateVandorCoverImage } from "../controllers/VandorController";
import { Authenticate } from "../middlewares/CommonAuth";
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString()+'_'+file.originalname);
    }
})

const images = multer({ storage: imageStorage }).array('images', 10);

router.post('/login', VandorLogin);
router.use(Authenticate);
router.get('/profile', GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/coverimage', images, UpdateVandorCoverImage);
router.patch('/service', UpdateVandorService);
router.post('/food', images, AddFood);
router.get('/foods', GetFoods);

export { router as VandorRoute };