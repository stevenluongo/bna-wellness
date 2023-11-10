"use client";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createClient } from "../_actions";
import Input from "@/app/register/_input";
import { useForm } from "react-hook-form";
import { Client } from "@prisma/client";
import { redirect } from "next/navigation";

export default function CreateClientForm() {
  const { register, handleSubmit } = useForm<Client>();
  const { data: session } = useSession();
  const id = session?.user?.id;

  if (!id) {
    return null;
  }

  const action: () => void = handleSubmit(async (data) => {
    const fd = new FormData();
    fd.append("firstName", data.firstName);
    fd.append("lastName", data.lastName);
    await createClient(fd);
    toast.success("Client created");
    redirect("/clients");
  });

  return (
    <form action={action}>
      <Input placeholder="First Name" {...register("firstName")} />
      <Input placeholder="Last Name" {...register("lastName")} />
      <button type="submit">Create</button>
    </form>
  );
}
