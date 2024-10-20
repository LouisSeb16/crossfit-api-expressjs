import express from 'express';
import apicache from 'apicache'
// import workoutController from '@src/controllers';
import { check } from "express-validator";
import workoutController from '../../controllers';

const router = express.Router();

let cache = apicache.middleware;

router.get('/', cache('2 minutes'), workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);

router.post("/",
    [
        check('name').isString().notEmpty().withMessage('Name is required and must be a string.'),
        check('mode').isString().notEmpty().withMessage('Mode is required and must be a string.'),
        check('equipment').isArray().withMessage('Equipment must be an array.'),
        check('exercises').isArray().withMessage('Exercises must be an array.'),
        check('trainerTips').isArray().optional().withMessage('Trainer tips must be an array.'),
    ],
    workoutController.createNewWorkout);

router.patch("/:workoutId", workoutController.updateOneWorkout);

router.delete("/:workoutId", workoutController.deleteOneWorkout);

export default router;