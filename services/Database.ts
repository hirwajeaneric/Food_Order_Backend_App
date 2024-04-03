import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

export default async () => {
    mongoose.connect(MONGO_URI)
    .then(result => console.log("DB Connected"))
    .catch(err => console.log('error: '+err));
}

