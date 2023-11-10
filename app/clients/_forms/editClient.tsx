"use client";

import { toast } from "react-toastify";
import { editClient, fetchClientById } from "../_actions";
import Input from "@/app/register/_input";
import { useForm } from "react-hook-form";
import { Client } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type ClientWithAddress = ThenArg<ReturnType<typeof fetchClientById>>;

export default function EditClientForm({
  client,
}: {
  client: ClientWithAddress;
}) {
  const { register, handleSubmit } = useForm<Client>();

  if (!client) return redirect("/clients");

  const editClientWithId = editClient.bind(null, client.id);

  const action: () => void = handleSubmit(async (data) => {
    const fd = new FormData();
    fd.append("firstName", data.firstName);
    fd.append("lastName", data.lastName);
    await editClientWithId(fd);
    toast.success("Client successfully updated");
  });

  return (
    <form action={action}>
      <Link href={`/clients/id/${client.id}`}>Back</Link>
      <Input
        placeholder="First Name"
        {...register("firstName")}
        defaultValue={client.firstName}
      />
      <Input
        placeholder="Last Name"
        {...register("lastName")}
        defaultValue={client.lastName}
      />
      <button type="submit">Edit</button>
    </form>
  );
}
