import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import workoutModel from '../models/workout';
// import workoutModel from '@src/models/workout';

describe('Workouts API', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI as string);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('GET /api/v1/workouts - should return all workouts', async () => {

        const response = await request(app).get('/api/v1/workouts');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'OK');
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data[0]).toHaveProperty('_id');
        expect(response.body.data[0]).toHaveProperty('name');
        expect(response.body.data[0]).toHaveProperty('mode');
        expect(response.body.data[0]).toHaveProperty('equipment');
        expect(response.body.data[0]).toHaveProperty('exercises');
        expect(response.body.data[0]).toHaveProperty('createdAt');
        expect(response.body.data[0]).toHaveProperty('updatedAt');
    }, 10000);

    it('GET /api/v1/workouts/:workoutId - should return a specific workout', async () => {
        const workout = await workoutModel.findOne();
        const workoutId: any = workout?._id;
        const response = await request(app).get(`/api/v1/workouts/${workoutId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'OK');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('_id', workoutId.toString());
    });

    it('GET /api/v1/workouts/:workoutId - should return 404 if workout does not exist', async () => {
        const workoutId = '60b8d15e489f3b65f14f4c57';
        const response = await request(app).get(`/api/v1/workouts/${workoutId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('status', 'FAILED');
        expect(response.body.data).toHaveProperty('error', `Can't find workout with the id '${workoutId}'`);
    });

    it('POST /api/v1/workouts - should create a new workout', async () => {
        const newWorkout = {
            name: 'New Crossfit Workout',
            mode: 'For time',
            equipment: ['barbell', 'dumbbell'],
            exercises: ['Clean and Jerk', 'Snatch'],
            trainerTips: ['Maintain proper form', 'Breathe steadily']
        };

        const response = await request(app).post('/api/v1/workouts').send(newWorkout);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', 'OK');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data).toHaveProperty('name', newWorkout.name);
        expect(response.body.data).toHaveProperty('mode', newWorkout.mode);
        expect(response.body.data).toHaveProperty('equipment', newWorkout.equipment);
        expect(response.body.data).toHaveProperty('exercises', newWorkout.exercises);
        expect(response.body.data).toHaveProperty('trainerTips', newWorkout.trainerTips);
    });

    it('POST /api/v1/workouts - should return 400 for validation errors', async () => {
        const invalidWorkout = {
            name: '',
            mode: 'For time',
            equipment: 'barbell',
            exercises: [],
        };

        const response = await request(app).post('/api/v1/workouts').send(invalidWorkout);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('status', 'FAILED');
        expect(response.body.data).toHaveProperty('errors');
        expect(Array.isArray(response.body.data.errors)).toBe(true);
        expect(response.body.data.errors[0]).toHaveProperty('msg', 'Name is required and must be a string.');
        expect(response.body.data.errors[1]).toHaveProperty('msg', 'Equipment must be an array.');
    });

    it('should delete a workout successfully', async () => {
        const allWorkoutsResponse = await request(app).get('/api/v1/workouts');
        expect(allWorkoutsResponse.status).toBe(200);
    
        const workouts = allWorkoutsResponse.body.data;
        expect(workouts).toBeDefined();
        expect(workouts.length).toBeGreaterThan(0);
    
        const workoutId = workouts[0]._id;
        const response = await request(app).delete(`/api/v1/workouts/${workoutId}`);
        console.log('Delete response:', response.body);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
        const deletedWorkout = await workoutModel.findById(workoutId);
        expect(deletedWorkout).toBeNull();
    });

    it('should return 404 if workout does not exist', async () => {
        const nonExistentWorkoutId = '60b8d15e489f3b65f14f4c57';
        const response = await request(app).delete(`/api/v1/workouts/${nonExistentWorkoutId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('status', 'FAILED');
        expect(response.body.data).toHaveProperty('error', 'Workout not found');
    });

    it('should return 400 for invalid workout ID format', async () => {
        const invalidWorkoutId = '999';
        const response = await request(app).delete(`/api/v1/workouts/${invalidWorkoutId}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('status', 'FAILED');
        expect(response.body.data).toHaveProperty('error', "Invalid workout ID format");
    });
});
