"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const limiter_1 = __importDefault(require("./middleware/limiter"));
const workoutRoutes_1 = __importDefault(require("./v1/routes/workoutRoutes"));
const swagger_1 = __importDefault(require("./v1/swagger"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(limiter_1.default);
app.use("/api/v1/workouts", workoutRoutes_1.default);
(0, database_1.default)()
    .then(() => {
    if (process.env.NODE_ENV !== 'test') {
        app.listen(port, () => {
            (0, swagger_1.default)(app, port);
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
})
    .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
});
exports.default = app;
