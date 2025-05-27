/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../prismaClient";
import { Request, Response } from "express";

const userClient = prisma.users;

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await userClient.findMany();
  res.status(200).json({ data: allUsers });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await userClient.findUnique({
    where: { shibboleth_id: id },
  });

  res.status(200).json({ data: user });
};

