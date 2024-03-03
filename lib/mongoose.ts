import mongoose, { mongo } from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); // prevent unknown fields queries

    if (!process.env.MONGODB_URL) return console.log('MONDODB_URL not found');

    if (isConnected) return console.log('Already connected to MongoDB');

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}