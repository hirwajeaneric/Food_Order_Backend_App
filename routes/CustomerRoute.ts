import express, { Request, Response, NextFunction } from 'express';
import { CustomerSignup, CustomerLogin, CustomerVerify, RequestOtp, GetCustomerProfile, EditCustomerProfile } from '../controllers';

const router = express.Router();

/** ----------------------------- Signup / Create Customer ----------------------------- */
router.post('/signup', CustomerSignup);

/** ----------------------------- Login ----------------------------- */
router.post('/login', CustomerLogin);

// Authentication
/** ----------------------------- Verify Customer Account ----------------------------- */
router.patch('/verify', CustomerVerify);

/** ----------------------------- OTP / Requesting OTP ----------------------------- */
router.get('/otp', RequestOtp);

/** ----------------------------- Profile ----------------------------- */
router.get('/profile', GetCustomerProfile);

router.patch('/profile', EditCustomerProfile);

// Cart
// Order
// Payment


export { router as CustomerRoute }