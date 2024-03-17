import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { prismaClient } from "../application/database";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("X-API-TOKEN");

  // kalo usernya ada, ditambahkan ke object requestnya

  if (token) {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });

    // user disini gaada di "Request" bawaannya express, maka dari itu tambahin di types/user-request

    if (user) {
      req.user = user;
      next();
      return;
    }
  }

  res
    .status(401)
    .json({
      errors: "Unauthorized",
    })
    .end();
};
