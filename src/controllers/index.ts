import { Request, Response } from 'express';
import { validationResult } from "express-validator";
// import paginate from '@src/middleware/pagination';
// import workoutService from '@src/services';
import mongoose from 'mongoose';
import workoutService from '../services';
import paginate from '../middleware/pagination';

const getAllWorkouts = async (req: Request, res: Response) => {
    try {
        const workouts = await workoutService.getAllWorkouts(req.query);
        paginate(workouts)(req, res, () => {
            res.status(200).json({ status: "OK", ...res.pagination });
        });
    } catch (error: any) {
        res.status(500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneWorkout = async (req: Request, res: Response): Promise<any> => {
    const { params: { workoutId } } = req;
    if (!workoutId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter ':workoutId' can not be empty" },
        });
    };

    try {
        const workout = await workoutService.getOneWorkout(workoutId);
        if (!workout) {
            return res.status(404).json({ status: "FAILED", data: { error: `Can't find workout with the id '${workoutId}'` } });
        }
        res.status(200).json({ status: "OK", data: workout });

    } catch (error: any) {
        res.status(500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewWorkout = async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 'FAILED',
            data: { errors: errors.array() },
        });
        return;
    }

    try {
        const newWorkout = await workoutService.createNewWorkout(req.body);
        res.status(201).json({ status: "OK", data: newWorkout });
    } catch (error: any) {
        res.status(500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneWorkout = async (req: Request, res: Response): Promise<any> => {
    const { params: { workoutId } } = req;

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        return res.status(400).json({
            status: 'FAILED',
            data: { error: `Invalid ID format '${workoutId}'` }
        });
    }

    try {
        const updatedWorkout = await workoutService.updateWorkout(req.params.workoutId, req.body);
        if (!updatedWorkout) {
            return res.status(404).json({ status: "FAILED", data: { error: "Workout not found" } });
        }
        res.status(200).json({ status: "OK", data: updatedWorkout });
    } catch (error: any) {
        res.status(500).send({ status: "FAILED", data: { error: error?.message || error } });
    };
};

const deleteOneWorkout = async (req: Request, res: Response): Promise<any> => {
    const { params: { workoutId } } = req;

    if (!workoutId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter ':workoutId' can not be empty" },
        });
    };

    try {

        const workout = await workoutService.deleteWorkout(req.params.workoutId);
        if (!workout) {
            return res.status(404).json({ status: "FAILED", data: { error: "Workout not found" } });
        };
        res.status(204).send();
    } catch (error: any) {
        if (error.message === "Invalid workout ID format") {
            return res.status(400).send({ status: "FAILED", data: { error: error.message } });
        }
        res.status(500).send({ status: "FAILED", data: { error: error?.message || error } });
    };

};

const workoutController = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};

export default workoutController;