import prisma from "@/lib/prisma";
import crypto from "crypto";
import { User } from "@/lib/types";
import { Prisma } from "@prisma/client";

export const validatePassword = (
  user: Omit<User, "password">,
  password: string
) => {
  const inputHash = crypto
    .pbkdf2Sync(password, user.salt!, 1000, 64, "sha512")
    .toString("hex");
  return user.hash === inputHash;
};

export const generateHash = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
};

export const authenticate = async (
  credentials: Record<"password" | "username", string> | undefined
) => {
  if (!credentials?.password) {
    throw new Error("No password provided");
  }

  const user = await prisma.user.findUnique({
    where: {
      username: credentials?.username,
    },
  });

  if (!user) {
    throw new Error("No user found with that username");
  }

  if (!validatePassword(user, credentials?.password)) {
    throw new Error("Invalid username and password combination");
  }

  const { hash, salt, ...rest } = user;

  return rest;
};

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export function excludeFields<T extends Entity, K extends Keys<T>>(
  type: T,
  omit: K[]
) {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }
  return result;
}
