import { redirect } from "next/navigation";
import { fetchClientById } from "../../_actions";
import Link from "next/link";
import DeleteClientForm from "../../_forms/deleteClient";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const client = await fetchClientById(id);

  if (!client) return redirect("/clients");

  return (
    <div>
      <div className="flex gap-x-2">
        <p>{client.firstName}</p>
        <p>{client.lastName}</p>
      </div>
      <Link href={`/clients/id/${client.id}/edit`}>Edit</Link>
      <DeleteClientForm id={client.id} />
    </div>
  );
}
