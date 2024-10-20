"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../index"));
const workout_1 = __importDefault(require("@src/models/workout"));
describe('Workouts API', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('GET /api/v1/workouts - should return all workouts', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/v1/workouts');
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
    }), 10000);
    it('GET /api/v1/workouts/:workoutId - should return a specific workout', () => __awaiter(void 0, void 0, void 0, function* () {
        const workout = yield workout_1.default.findOne();
        const workoutId = workout === null || workout === void 0 ? void 0 : workout._id;
        const response = yield (0, supertest_1.default)(index_1.default).get(`/api/v1/workouts/${workoutId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'OK');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('_id', workoutId.toString());
    }));
    it('GET /api/v1/workouts/:workoutId - should return 404 if workout does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const workoutId = '60b8d15e489f3b65f14f4c57';
        const response = yield (0, supertest_1.default)(index_1.default).get(`/api/v1/workouts/${workoutId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('status', 'FAILED');
        expect(response.body.data).toHaveProperty('error', `Can't find workout with the id '${workoutId}'`);
    }));
    it('POST /api/v1/workouts - should create a new workout', () => __awaiter(void 0, void 0, void 0, function* () {
        const newWorkout = {
            name: 'New Crossfit Workout',
            mode: 'For time',
            equipment: ['barbell', 'dumbbell'],
            exercises: ['Clean and Jerk', 'Snatch'],
            trainerTips: ['Maintain proper form', 'Breathe steadily']
        };
        const response = yield (0, supertest_1.default)(index_1.default).post('/api/v1/workouts').send(newWorkout);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', 'OK');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data).toHaveProperty('name', newWorkout.name);
        expect(response.body.data).toHaveProperty('mode', newWorkout.mode);
        expect(response.body.data).toHaveProperty('equipment', newWorkout.equipment);
        expect(response.body.data).toHaveProperty('exercises', newWorkout.exercises);
        expect(response.body.data).toHaveProperty('trainerTips', newWorkout.trainerTips);
    }));
    it('POST /api/v1/workouts - should return 400 for validation errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidWorkout = {
            name: '',
            mode: 'For time',
            equipment: 'barbell',
            exercises: [],
        };
        const response = yield (0, supertest_1.default)(index_1.default).post('/api/v1/workouts').send(invalidWorkout);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('status', 'FAILED');
        expect(response.body.data).toHaveProperty('errors');
        expect(Array.isArray(response.body.data.errors)).toBe(true);
        expect(response.body.data.errors[0]).toHaveProperty('msg', 'Name is required and must be a string.');
        expect(response.body.data.errors[1]).toHaveProperty('msg', 'Equipment must be an array.');
    }));
    it('should delete a workout successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const allWorkoutsResponse = yield (0, supertest_1.default)(index_1.default).get('/api/v1/workouts');
        expect(allWorkoutsResponse.status).toBe(200);
        const workouts = allWorkoutsResponse.body.data;
        expect(workouts).toBeDefined();
        expect(workouts.length).toBeGreaterThan(0);
        const workoutId = workouts[0]._id;
        const response = yield (0, supertest_1.default)(index_1.default).delete(`/api/v1/workouts/${workoutId}`);
        console.log('Delete response:', response.body);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
        const deletedWorkout = yield workout_1.default.findById(workoutId);
        expect(deletedWorkout).toBeNull();
    }));
    it('should return 404 if workout does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentWorkoutId = '60b8d15e489f3b65f14f4c57';
        const response = yield (0, supertest_1.default)(index_1.default).delete(`/api/v1/workouts/${nonExistentWorkoutId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('status', 'FAILED');
        expect(response.body.data).toHaveProperty('error', 'Workout not found');
    }));
    it('should return 400 for invalid workout ID format', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidWorkoutId = '999';
        const response = yield (0, supertest_1.default)(index_1.default).delete(`/api/v1/workouts/${invalidWorkoutId}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('status', 'FAILED');
        expect(response.body.data).toHaveProperty('error', "Invalid workout ID format");
    }));
});
