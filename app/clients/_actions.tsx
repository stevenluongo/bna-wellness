"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchAllClients() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        address: true,
      },
    });
    return clients;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchClientById(id: string) {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        address: true,
      },
    });
    return client;
  } catch (e) {
    console.log(e);
  }
}

export async function createClient(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    await prisma.client.create({
      data: {
        firstName,
        lastName,
      },
    });
    revalidatePath("/clients");
  } catch (e) {
    console.log(e);
  }
}

export async function editClient(id: string, formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    await prisma.client.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
      },
    });
    revalidatePath("/clients");
    revalidatePath(`/clients/id/${id}`);
  } catch (e) {
    console.log(e);
  }
}

export async function deleteClient(id: string) {
  try {
    await prisma.client.delete({
      where: {
        id,
      },
    });
    revalidatePath("/clients");
  } catch (e) {
    console.log(e);
  }
}
