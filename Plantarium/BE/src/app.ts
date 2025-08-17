import express from 'express';
import userRouter from './routes/user.routes';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import surfaceRouter from './routes/structBeds.routes';
import bedRouter from './routes/bed.routes';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/users', userRouter);
app.use('/', surfaceRouter);
app.use('/', bedRouter);
app.use('/me/garden/beds', bedRouter);
app.use('/me/garden/individual-plants', require('./routes/plants.router').default);

export default app;

//middleware
//routen definieren