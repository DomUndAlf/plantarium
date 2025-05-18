import express from 'express';
import userRouter from './routes/user.routes';
import cors from 'cors';
import passport from 'passport';

const app = express();
app.use(cors());

app.use(express.json());
app.use(passport.initialize());

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello, Worlddd!');
});

app.use('/users', userRouter);

export default app;

//middleware
//routen definieren