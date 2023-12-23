import express, { Request, Response, NextFunction } from "express";
import { CreateVandor, GetVandorById, GetVandors } from "../controllers";

const router = express.Router();

router.post('/vandor', CreateVandor);
router.get('/vandors', GetVandors);
router.get('/vandor/:id', GetVandorById);

export { router as VandorRoute };