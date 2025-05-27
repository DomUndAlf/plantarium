/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../prismaClient";
import { Request, Response } from "express";

const userClient = prisma.users;


