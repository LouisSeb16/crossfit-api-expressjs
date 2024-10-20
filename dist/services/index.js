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
const workout_1 = __importDefault(require("@src/models/workout"));
const getAllWorkouts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (query.mode)
        filter.mode = query.mode;
    return yield workout_1.default.find();
});
const getOneWorkout = (workoutId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield workout_1.default.findById(workoutId).exec();
});
const createNewWorkout = (workoutData) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkout = new workout_1.default(workoutData);
    return yield newWorkout.save();
});
const updateWorkout = (workoutId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield workout_1.default.findByIdAndUpdate(workoutId, updateData, { new: true });
});
const deleteWorkout = (workoutId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield workout_1.default.findByIdAndDelete(workoutId);
    }
    catch (error) {
        if (error.name === 'CastError') {
            throw new Error("Invalid workout ID format");
        }
        throw error;
    }
});
const workoutService = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateWorkout,
    deleteWorkout
};
exports.default = workoutService;
