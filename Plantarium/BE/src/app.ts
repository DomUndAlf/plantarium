import express from 'express';
import userRouter from './routes/user.routes.js';

const app = express();

app.use(express.json());

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello, Worlddd!');
});

app.use('/users', userRouter);

export default app;

//middleware
//routen definieren