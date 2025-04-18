import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userClient = prisma.users;

export const getAllUsers = async (req: any, res: any) => {
  const allUsers = await userClient.findMany({
    include: {
      beds: true,
    },
  });

  res.status(200).json({ data: allUsers });
};

export default getAllUsers;