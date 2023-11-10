import { redirect } from "next/navigation";
import { fetchClientById } from "../../_actions";
import Link from "next/link";
import DeleteClientForm from "../../_forms/deleteClient";
import Image from "next/image";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const client = await fetchClientById(id);

  if (!client) return redirect("/clients");

  return (
    <div>
      <div>
        <p>{client.firstName}</p>
        <p>{client.lastName}</p>
        <p>{client.email}</p>
        <p>{client.age}</p>
        <p>{client.homeNumber}</p>
        <p>{client.cellNumber}</p>
        <p>{client.notes}</p>
        {client.image && (
          <Image
            src={client.image}
            alt="client image"
            width={200}
            height={200}
          />
        )}
        <p>{client.address?.line1}</p>
        <p>{client.address?.line2}</p>
        <p>{client.address?.city}</p>
        <p>{client.address?.state}</p>
        <p>{client.address?.postalCode}</p>
        <p>{client.address?.country}</p>
      </div>
      <Link href={`/clients/id/${client.id}/edit`}>Edit</Link>
      <DeleteClientForm id={client.id} />
    </div>
  );
}
