import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

interface IWorkout extends Document {
    name: string;
    mode: string;
    equipment: string[];
    exercises: string[];
    trainerTips?: string[];
}

const workoutSchema = new Schema({
    id: { type: String, default: uuidv4(), unique: true },
    name: { type: String, required: true },
    mode: { type: String, required: true },
    equipment: { type: [String], required: true },
    exercises: { type: [String], required: true },
    trainerTips: { type: [String] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});;

const workoutModel = mongoose.model<IWorkout>("Workout", workoutSchema);

export default workoutModel;
