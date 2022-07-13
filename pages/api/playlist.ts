import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(
  async (_: NextApiRequest, res: NextApiResponse, user) => {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        name: "asc",
      },
    });

    res.json(playlists);
  },
);
