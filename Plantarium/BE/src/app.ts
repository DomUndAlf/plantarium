import express from 'express';
import userRouter from './routes/user.routes';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/users', userRouter);

export default app;

//middleware
//routen definieren