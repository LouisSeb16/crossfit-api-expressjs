import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);

        const db = conn.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        db.once('open', () => {

            console.log(`MongoDB Connected: ${conn.connection.host}`);
        });

    } catch (error) {

        console.error(`Error: ${error}`);

        process.exit(1);
    }
};

export default connectDB;
