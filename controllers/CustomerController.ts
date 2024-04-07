import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { CreateCustomerInputs, UserLoginInputs } from '../dto/Customer.dto';
import { validate } from 'class-validator';
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword, onRequestOTP } from '../utility';
import { Customer } from '../models/Customer';


/**
 * Signs up a new customer.
 *
 * @param req - Express request object containing the customer input data.
 * @param res - Express response object to send the result back to the client.
 * @param next - Express next function to handle errors and middleware execution.
 * @returns A promise that resolves to the HTTP response status 201 if the signup is successful,
 *          or 400 if there is an error with the signup process.
 */
export const CustomerSignup = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    // Validate the customer input data.
    const customerinputs = plainToClass(CreateCustomerInputs, req.body);
    const inputErrors = await validate(customerinputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    };

    // Extract the necessary input data.
    const { email, phone, password } = customerinputs;

    // Generate a random salt.
    const salt = await GenerateSalt();

    // Hash the password using the generated salt.
    const userPassword = await GeneratePassword(password, salt);

    // Generate an OTP and its expiry time.
    const { expiry, otp } = GenerateOtp();

    // Check if a customer with the same email already exists.
    const existingCustomer = await Customer.findOne({ email: email });
    if (existingCustomer !== null) {
        return res.status(409).json({ message: "User with this email already exists" });
    };

    // Create a new customer record in the database.
    const result = await Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        otp: otp,
        otp_expiry: expiry,
        firstName: "",
        lastName: "",
        address: "",
        verified: false,
        phone: phone,
        lat: 0,
        lng: 0
    });

    // If the customer record is successfully created, send the OTP to the customer and generate a signature.
    if (result) {
        // Send the OTP to customer
        // await onRequestOTP(otp, phone);

        // Generate the signature
        const signature = await GenerateSignature({
            _id: result._id,
            email: result.email,
            verified: result.verified
        });

        // Send the result to client
        return res.status(201).json({ signature: signature, verified: result.verified, email: result.email });
    }

    // If there is an error with the signup process, return a 400 status code.
    return res.status(400).json({ message: "Error with Signup" });
};


/**
 * Handles the login process for a customer.
 *
 * @param req - Express request object containing the login input data.
 * @param res - Express response object to send the result back to the client.
 * @param next - Express next function to handle errors and middleware execution.
 * @returns A promise that resolves to the HTTP response status 201 if the login is successful,
 *          or 400 if there is an error with the login process.
 */
export const CustomerLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    // Validate the login input data.
    const loginInputs = plainToClass(UserLoginInputs, req.body);
    const loginErrors = await validate(loginInputs, { ValidationError: { target: false } });
    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors);
    };

    // Extract the necessary login input data.
    const { email, password } = loginInputs;

    // Find a customer with the same email in the database.
    const existingCustomer = await Customer.findOne({ email: email });

    if (existingCustomer) {
        // Validate the password using the stored salt.
        const validation = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);

        if (validation) {
            // Generate the signature
            const signature = await GenerateSignature({
                _id: existingCustomer._id,
                email: existingCustomer.email,
                verified: existingCustomer.verified
            });

            // Send the result to client
            return res.status(201).json({ 
                signature: signature, 
                verified: existingCustomer.verified, 
                email: existingCustomer.email 
            });
        } else {
            return res.status(400).json({ message: "Invalid password" });
        }
    }
    return res.status(404).json({ message: 'Login error' });
};

/**
 * Verifies the customer's OTP and updates the verified status.
 *
 * @param req - Express request object containing the OTP to verify.
 * @param res - Express response object to send the result back to the client.
 * @param next - Express next function to handle errors and middleware execution.
 * @returns A promise that resolves to the HTTP response status 200 if the OTP is valid and the customer is verified,
 *          or 400 if there is an error with the OTP validation.
 */
export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body;
    const customer = req.user;

    if (customer) {
        const profile = await Customer.findById(customer._id);

        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;
                const updatedCustomerResponse = await profile.save();
                // Generate the signature
                const signature = await GenerateSignature({
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified
                });

                // Send the result to client
                return res.status(200).json({
                    signature: signature,
                    verified: updatedCustomerResponse.verified,
                    email: updatedCustomerResponse.email
                });
            }
        }
    }
    return res.status(400).json({ message: "Error with OTP Validation" });
};

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {

};

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

};

export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

};

