import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRouter from './routes';

// Initialize the Express application
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

//Hauptseite 
app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello, Worlkgkghkhgd!'); // Send 'Hello, World!' as the response
});

//user (inklusive beds beziehung) aus datenbank holen
const userClient = prisma.users;
export const getAllUsers = async (req: any, res: any) => {
  const allUsers = await userClient.findMany({
    include: {
      beds: true
    }
  })

  res.status(200).json({data: allUsers})
  console.log(allUsers);
}

app.use('/users', userRouter);

export default app;

//middleware
//routen definieren