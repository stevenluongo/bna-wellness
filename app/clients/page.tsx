import Link from "next/link";
import prisma from "@/lib/prisma";

async function getClients() {
  "use server";
  const clients = await prisma.client.findMany({
    include: {
      address: true,
    },
  });
  return clients;
}

export default async function Page() {
  const clients = await getClients();
  return (
    <div>
      <p>Clients!</p>
      <Link href="/clients/create">Create Client</Link>
      {clients?.map((client) => (
        <Link
          key={client.id}
          href={`/clients/id/${client.id}`}
          className="flex gap-x-2"
        >
          <p>{client.firstName}</p>
          <p>{client.lastName}</p>
        </Link>
      ))}
    </div>
  );
}
