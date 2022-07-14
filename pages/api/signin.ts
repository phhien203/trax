import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { UserTokenPayload } from "../../types/user-token-payload";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const payload: UserTokenPayload = {
      id: user.id,
      email: user.email,
      time: Date.now(),
    };
    const token = jwt.sign(payload, "hello", {
      expiresIn: "8h",
    });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("TRAX_ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      }),
    );

    res.json(user);
  } else {
    res.status(401);
    res.json({ error: "Email or password is incorrect" });
  }
}
