import { User } from "@prisma/client";

export type UserTokenPayload = Pick<User, "id" | "email"> & { time: number };
