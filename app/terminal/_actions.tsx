"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchTerminal() {
  return prisma.terminal.findFirst({
    where: {
      isActive: true,
    },
    include: {
      openedBy: true,
    },
  });
}

export async function createTerminal(userId: string) {
  try {
    await prisma.terminal.create({
      data: {
        openedBy: {
          connect: {
            id: userId,
          },
        },
        location: "FITNESS",
      },
    });
    revalidatePath("/terminal");
  } catch (e) {
    console.log(e);
  }
}

export async function closeTerminal(terminalId: string, formData: FormData) {
  try {
    const closedById = formData.get("closedById") as string;
    await prisma.terminal.update({
      where: {
        id: terminalId,
      },
      data: {
        isActive: false,
        closedBy: {
          connect: {
            id: closedById,
          },
        },
      },
    });
    revalidatePath("/terminal");
  } catch (e) {
    console.log(e);
  }
}
