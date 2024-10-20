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
const express_validator_1 = require("express-validator");
const pagination_1 = __importDefault(require("@src/middleware/pagination"));
const services_1 = __importDefault(require("@src/services"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workouts = yield services_1.default.getAllWorkouts(req.query);
        (0, pagination_1.default)(workouts)(req, res, () => {
            res.status(200).json(Object.assign({ status: "OK" }, res.pagination));
        });
    }
    catch (error) {
        res.status(500).send({ status: "FAILED", data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
});
const getOneWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { workoutId } } = req;
    if (!workoutId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter ':workoutId' can not be empty" },
        });
    }
    ;
    try {
        const workout = yield services_1.default.getOneWorkout(workoutId);
        if (!workout) {
            return res.status(404).json({ status: "FAILED", data: { error: `Can't find workout with the id '${workoutId}'` } });
        }
        res.status(200).json({ status: "OK", data: workout });
    }
    catch (error) {
        res.status(500).send({ status: "FAILED", data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
});
const createNewWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 'FAILED',
            data: { errors: errors.array() },
        });
        return;
    }
    try {
        const newWorkout = yield services_1.default.createNewWorkout(req.body);
        res.status(201).json({ status: "OK", data: newWorkout });
    }
    catch (error) {
        res.status(500).send({ status: "FAILED", data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
});
const updateOneWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { workoutId } } = req;
    if (!mongoose_1.default.Types.ObjectId.isValid(workoutId)) {
        return res.status(400).json({
            status: 'FAILED',
            data: { error: `Invalid ID format '${workoutId}'` }
        });
    }
    try {
        const updatedWorkout = yield services_1.default.updateWorkout(req.params.workoutId, req.body);
        if (!updatedWorkout) {
            return res.status(404).json({ status: "FAILED", data: { error: "Workout not found" } });
        }
        res.status(200).json({ status: "OK", data: updatedWorkout });
    }
    catch (error) {
        res.status(500).send({ status: "FAILED", data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
    ;
});
const deleteOneWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { workoutId } } = req;
    if (!workoutId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter ':workoutId' can not be empty" },
        });
    }
    ;
    try {
        const workout = yield services_1.default.deleteWorkout(req.params.workoutId);
        if (!workout) {
            return res.status(404).json({ status: "FAILED", data: { error: "Workout not found" } });
        }
        ;
        res.status(204).send();
    }
    catch (error) {
        if (error.message === "Invalid workout ID format") {
            return res.status(400).send({ status: "FAILED", data: { error: error.message } });
        }
        res.status(500).send({ status: "FAILED", data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
    ;
});
const workoutController = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};
exports.default = workoutController;
