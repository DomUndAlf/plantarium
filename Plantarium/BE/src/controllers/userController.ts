import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userClient = prisma.users;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllUsers = async (req:any, res:any) => {
  const allUsers = await userClient.findMany();
  res.status(200).json({ data: allUsers });
};



