/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../prismaClient";

const userClient = prisma.users;

export const getAllUsers = async (req:any, res:any) => {
  const allUsers = await userClient.findMany();
  res.status(200).json({ data: allUsers });
};

export const getUser = async (req: any, res: any) => {
  const { id } = req.params;
  
  const user = await userClient.findUnique({
    where: {shibboleth_id: id},
  });
  res.status(200).json({ data: user });
}

