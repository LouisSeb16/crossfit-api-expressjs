import { Router } from 'express';
import { check } from "express-validator";
import workoutController from '../controllers';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: "Tommy V"  
 *         mode:
 *           type: string
 *           example: "For Time"
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: "4/20/2022, 2:21:56 PM"
 *         updatedAt: 
 *           type: string
 *           example: "4/20/2022, 2:21:56 PM"
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "61dbae02-c147-4e28-863c-db7bd402b2d6"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           example: "male"
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           example: "1990-01-01"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "hashed_password_here"
 *     Record:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "61dbae02-c147-4e28-863c-db7bd402b2d7"
 *         workoutId:
 *           type: string
 *           example: "61dbae02-c147-4e28-863c-db7bd402b2d6"
 *         memberId:
 *           type: string
 *           example: "61dbae02-c147-4e28-863c-db7bd402b2d5"
 *         performance:
 *           type: object
 *           properties:
 *             reps:
 *               type: integer
 *               example: 30
 *             time:
 *               type: string
 *               format: time
 *               example: "15:30"  # Example time in HH:mm format
 *         createdAt:
 *           type: string
 *           example: "2024-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           example: "2024-01-02T12:00:00Z"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "61dbae02-c147-4e28-863c-db7bd402b2d7"
 *         workoutId:
 *           type: string
 *           example: "61dbae02-c147-4e28-863c-db7bd402b2d6"
 *         memberId:
 *           type: string
 *           example: "61dbae02-c147-4e28-863c-db7bd402b2d5"
 *         performance:
 *           type: object
 *           properties:
 *             reps:
 *               type: integer
 *               example: 30
 *             time:
 *               type: string
 *               format: time
 *               example: "15:30"  # Example time in HH:mm format
 *         createdAt:
 *           type: string
 *           example: "2024-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           example: "2024-01-02T12:00:00Z"
 */


/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/workouts/{workoutId}:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the workout to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: "#/components/schemas/Workout"
 *       400:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Can't find workout with the id '123'"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */


/**
 * @openapi
 * /api/v1/workouts:
 *   post:
 *     tags:
 *       - Workouts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mode:
 *                 type: string
 *               equipment:
 *                 type: array
 *                 items:
 *                   type: string
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: string
 *               trainerTips:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: "#/components/schemas/Workout"
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     errors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           msg:
 *                             type: string
 *                             example: "Name is required and must be a string."
 *                           param:
 *                             type: string
 *                             example: "name"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/workouts/{workoutId}:
 *   patch:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the workout to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mode:
 *                 type: string
 *               equipment:
 *                 type: array
 *                 items:
 *                   type: string
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: string
 *               trainerTips:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: "#/components/schemas/Workout"
 *       400:
 *         description: Validation Error or Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Can't find workout with the id '123'"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/workouts/{workoutId}:
 *   delete:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the workout to delete
 *     responses:
 *       204:
 *         description: No Content (Deleted)
 *       400:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Can't find workout with the id '123'"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */


router.get('/', workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);

router.post("/", [
    check('name').isString().notEmpty().withMessage('Name is required and must be a string.'),
    check('mode').isString().notEmpty().withMessage('Mode is required and must be a string.'),
    check('equipment').isArray().withMessage('Equipment must be an array.'),
    check('exercises').isArray().withMessage('Exercises must be an array.'),
    check('trainerTips').isArray().optional().withMessage('Trainer tips must be an array.'),
], workoutController.createNewWorkout);

router.patch("/:workoutId", workoutController.updateOneWorkout);

router.delete("/:workoutId", workoutController.deleteOneWorkout);


export default router;
