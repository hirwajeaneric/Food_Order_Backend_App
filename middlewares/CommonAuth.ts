import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto/Auth.dto";
import { ValidateSignature } from "../utility";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
}

/**
 * Authenticates the user using the provided request.
 * If the user is authenticated, the request is passed to the next middleware function.
 * If the user is not authenticated, an error response is sent.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await ValidateSignature(req);
    if (validate){
        next();
    } else {
        return res.json({ message: "User not authenticated"});
    }
}

