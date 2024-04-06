import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { CreateCustomerInputs } from '../dto/Customer.dto';
import { validate } from 'class-validator';
import { GenerateOtp, GeneratePassword, GenerateSalt } from '../utility';
import { Customer } from '../models/Customer';


export const CustomerSignup = async (req: Request, res: Response, next: NextFunction) => {
    const customerinputs = plainToClass(CreateCustomerInputs, req.body);
    const inputErrors = await validate(customerinputs, { validationError: { target: true }});
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    };
    const { email, phone, password } = customerinputs;

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const { expiry, otp } = GenerateOtp();
    const otp_expiry = new Date();

    console.log(otp, expiry);
    
    return res.json('Working...');

    const result = await Customer.create({
        email: email,
        password: password,
        salt: salt,
        opt: otp,
        otp_expiry: expiry,
        firstName: "",
        lastName: "",
        address: "",
        verified: false,
        phone: phone,
        lat: 0,
        lng: 0
    });

    if (result) {
        // Send the OTP to customer

        // Generate the signature

        // Send the result to client

    }

};

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {

};

export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {

};

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {

};

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

};

export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

};

