import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { UserTokenPayload } from "../types/user-token-payload";
import prisma from "./prisma";

type APIHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User,
) => void | any;

export const validateRoute = (handler: APIHandler) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user: User;

      try {
        const { id } = jwt.verify(token, "hello") as JwtPayload;
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "No auth token" });
  };
};

export const validateToken = (token) => {
  const userPayload = jwt.verify(token, "hello") as JwtPayload;
  return userPayload as UserTokenPayload;
};