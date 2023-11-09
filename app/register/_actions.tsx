"use server";

import { generateHash } from "@/lib/auth";
import { User } from "@/lib/types";
import prisma from "@/lib/prisma";

export async function createUser(formData: User) {
  const { firstName, lastName, username, password } = formData;

  const { salt, hash } = generateHash(password);

  const response = await prisma.user.create({
    data: {
      username,
      firstName,
      lastName,
      hash,
      salt,
    },
  });

  return JSON.stringify(response);
}
