import express, {Request, Response, NextFunction } from 'express';
import { GetFoodAvailability, GetFoodIn3OMin, GetTopRestaurants, RestaurantById, SearchFoods } from '../controllers';

const router = express.Router();

/** -------------------------- FOOD AVAILABILITY ------------------------------- */
router.get('/:pincode', GetFoodAvailability);

/** -------------------------- TOP RESTAURANTS ------------------------------- */
router.get('/top-restaurants/:pincode', GetTopRestaurants);

/** -------------------------- FOODS AVAILABLE IN 30 MINUTES ------------------------------- */
router.get('/foods-in-30-min/:pincode', GetFoodIn3OMin);

/** -------------------------- SEARCH FOODS ------------------------------- */
router.get('/search/:pincode', SearchFoods);

/** -------------------------- FIND RESTAURANT BY ID ------------------------------- */
router.get('/restaurants/:id', RestaurantById);

export { router as ShoppingRoute };