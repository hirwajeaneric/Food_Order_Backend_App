import { Request, Response, NextFunction } from "express";
import { VandorLoginInputs } from "../dto";
import { findVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) =>{
    const { email, password } = <VandorLoginInputs>req.body;
    const existingVandor = await findVandor("", email);
    if(existingVandor !== null){
        const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt);
        if (validation) {
            const signature = await GenerateSignature(
                {
                    _id: existingVandor._id,
                    email: existingVandor.email,
                    name: existingVandor.name,
                    foodType: existingVandor.foodType
                }
            );
            
            return res.json(signature);
        } else  {
            return res.json({ "message": "Invalid password" }); 
        }
    }
    return res.json({ message: "Login credentials not valid"});
}

export const GetVandorProfile = async (req:Request, res:Response, next: NextFunction) => {
    
};

export const UpdateVandorProfile = async (req:Request, res:Response, next: NextFunction) => {

};

export const UpdateVandorService = async (req:Request, res:Response, next: NextFunction) => {

};