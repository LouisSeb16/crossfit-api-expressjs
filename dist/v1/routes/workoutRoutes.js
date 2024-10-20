"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apicache_1 = __importDefault(require("apicache"));
const controllers_1 = __importDefault(require("@src/controllers"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
let cache = apicache_1.default.middleware;
router.get('/', cache('2 minutes'), controllers_1.default.getAllWorkouts);
router.get("/:workoutId", controllers_1.default.getOneWorkout);
router.post("/", [
    (0, express_validator_1.check)('name').isString().notEmpty().withMessage('Name is required and must be a string.'),
    (0, express_validator_1.check)('mode').isString().notEmpty().withMessage('Mode is required and must be a string.'),
    (0, express_validator_1.check)('equipment').isArray().withMessage('Equipment must be an array.'),
    (0, express_validator_1.check)('exercises').isArray().withMessage('Exercises must be an array.'),
    (0, express_validator_1.check)('trainerTips').isArray().optional().withMessage('Trainer tips must be an array.'),
], controllers_1.default.createNewWorkout);
router.patch("/:workoutId", controllers_1.default.updateOneWorkout);
router.delete("/:workoutId", controllers_1.default.deleteOneWorkout);
exports.default = router;
