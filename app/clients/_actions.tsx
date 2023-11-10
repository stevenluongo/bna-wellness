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
    const email = formData.get("email") as string;
    const notes = formData.get("notes")
      ? JSON.parse(formData.get("notes") as string)
      : [];
    const age = formData.get("age")
      ? parseInt(formData.get("age") as string)
      : null;
    const homeNumber = formData.get("homeNumber") as string;
    const cellNumber = formData.get("cellNumber") as string;
    const image = formData.get("image") as string;

    // Address fields
    const line1 = formData.get("address.line1") as string;
    const line2 = formData.get("address.line2") as string;
    const city = formData.get("address.city") as string;
    const state = formData.get("address.state") as string;
    const postalCode = formData.get("address.postalCode") as string;
    const country = formData.get("address.country") as string;

    const client = await prisma.client.create({
      data: {
        firstName,
        lastName,
        email,
        notes,
        age,
        homeNumber,
        cellNumber,
        image,
        address: {
          create: {
            line1,
            line2,
            city,
            state,
            postalCode,
            country,
          },
        },
      },
    });
    revalidatePath("/clients");
    return JSON.stringify({ client });
  } catch (e) {
    return JSON.stringify({ error: e });
  }
}

export async function editClient(id: string, formData: FormData) {
  try {
    let updates = {};
    let address = {};

    for (const [key, value] of formData.entries()) {
      if (key.includes("address.")) {
        // @ts-ignore
        address[key.replace("address.", "")] = JSON.parse(value);
        continue;
      }
      // @ts-ignore
      updates[key] = JSON.parse(value);
    }

    await prisma.client.update({
      where: {
        id,
      },
      data: {
        ...updates,
        address: {
          update: address,
        },
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
