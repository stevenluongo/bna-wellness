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
    <div>
      <Link href="/clients/create">Create Client</Link>
      <ClientList clients={clients} />
    </div>
  );
}
