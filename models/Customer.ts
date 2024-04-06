import mongoose, { Schema, Document, Model } from "mongoose";

interface CustomerDoc extends Document {
    email: string;
    password: string;
    salt: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    verified: boolean;
    otp: number;
    otp_expiry: Date;
    lat: number;
    lng: number;
}

const CustomerSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: {type: String, required: true},
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phone: { type: String , required: true },
    verified: { type: Boolean, required: true},
    otp: { type: Number, required: true },
    otp_expiry: { type: Date, required: true },
    lat: { type: Number },
    lng: { type: Number }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.salt;
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
            // ret.id = ret._id;
        }
    },
    timestamps: true
});

const Customer = mongoose.model<CustomerDoc>("Customer", CustomerSchema)

export { Customer }