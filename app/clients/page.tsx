import Link from "next/link";
import { fetchAllClients } from "./_actions";
import { unstable_noStore as noStore } from "next/cache";

export default async function Page() {
  noStore();
  const clients = await fetchAllClients();
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
