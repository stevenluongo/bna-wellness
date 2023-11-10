import { fetchClientById } from "@/app/clients/_actions";
import EditClientForm from "@/app/clients/_forms/editClient";
import { redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const client = await fetchClientById(id);

  if (!client) return redirect("/clients");

  return (
    <div>
      <p>Client Edit</p>
      <EditClientForm client={client} />
    </div>
  );
}
