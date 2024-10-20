import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import connectDB from './database';
import limiter from './middleware/limiter';
import router from './v1/routes/workoutRoutes';
import swaggerDocs from './v1/swagger';

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors());

app.use(limiter);

app.use("/api/v1/workouts", router);

swaggerDocs(app, port);

connectDB()
    .then(() => {
        if (process.env.NODE_ENV !== 'test') {
            app.listen(port, () => {
                console.log(`Server is running on http://localhost:${port}`);
            });
        }
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    });

export default app;

