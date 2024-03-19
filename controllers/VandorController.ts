import { Request, Response, NextFunction } from "express";
import { EditVandorInput, VandorLoginInputs } from "../dto";
import { FindVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInputs>req.body;
    const existingVandor = await FindVandor("", email);
    if (existingVandor !== null) {
        const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt);
        if (validation) {
            const signature = await GenerateSignature({
                _id: existingVandor._id,
                email: existingVandor.email,
                name: existingVandor.name,
                foodType: existingVandor.foodType
            });

            return res.json(signature);
        } else {
            return res.json({ "message": "Invalid password" });
        }
    }
    return res.json({ message: "Login credentials not valid" });
}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVandor = await FindVandor(user._id);
        return res.json(existingVandor);
    }
    return res.json({ message: "Vandor information not found"});
};

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { address, name, foodType, phone } = <EditVandorInput>req.body;
    const user = req.user;

    if (user) {
        const existingVandor = await FindVandor(user._id);
        if (existingVandor !== null) {
            existingVandor.address = address;
            existingVandor.name = name;
            existingVandor.foodType = foodType;
            existingVandor.phone = phone;

            const savedResult = await existingVandor.save();
            return res.json(savedResult);
        }
        return res.json(existingVandor);
    }
    return res.json({ message: "Vandor information not found"});
};

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVandor = await FindVandor(user._id);
        if (existingVandor !== null) {
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;

            const savedResult = await existingVandor.save();
            return res.json(savedResult);
        }
        return res.json(existingVandor);
    }
    return res.json({ message: "Vandor information not found"});
};