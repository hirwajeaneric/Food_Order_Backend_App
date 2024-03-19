import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { VandorPayload } from '../dto';
import { APP_SECRET } from '../config';
import { AuthPayload } from '../dto/Auth.dto';
import { Request } from 'express';

/**
 * This function generates a salt to be used to generate passwords.
 * @returns salt string
 */
export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

/**
 * 
 * @param password new password
 * @param salt given salt number
 * @returns a password in form of a hashed password.
 */
export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

/**
 * 
 * @param enteredPassword the password to be checked
 * @param savedPassword the already existing password from the database
 * @param salt the salt that was used to generate the password
 * @returns true or false if the passwords match.
 */
export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await GeneratePassword(enteredPassword, salt) === savedPassword;
};

/**
 * Generates a signature token to be used to let a user logged in or do a specific activity once logged in.
 * @param payload an object that contains some information about the logged in user.
 * @returns signature string of text (a jwt token)
 */
export const GenerateSignature = async (payload: VandorPayload) => {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: '1d'}) // Other possible time of expiration formats are: 30m, 1h, 1d,...
};

/**
 * 
 * @param req 
 * @returns 
 */
export const ValidateSignature = async(req: Request) => {
    const signature = req.get('Authorization');
    if (signature) {
        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload;
        req.user = payload;
        return true;
    }
}