import Link from "next/link";
import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import ClientList from "./_list";

export async function getClients() {
  "use server";
  const clients = await prisma.client.findMany({
    include: {
      address: true,
    },
  });
  return clients;
}

export default async function Page() {
  noStore();
  const clients = await getClients();
  return (
    <div className="p-5 flex flex-col gap-y-4">
      <ClientList clients={clients} />
    </div>
  );
}
