import express from 'express';
import userRouter from './routes/user.routes';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import surfaceRouter from './routes/structBeds.routes';
import bedRouter from './routes/bed.routes';
import bedPlantsRouter from './routes/bedplants.routes';
import individualPlantsRouter from './routes/plants.router';
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/users', userRouter);
app.use('/me/garden/surfaces', surfaceRouter);
app.use('/me/garden/individual-plants', individualPlantsRouter);
app.use("/me/garden/beds", bedPlantsRouter);
app.use('/me/garden/beds', bedRouter);

export default app;

//middleware
//routen definieren