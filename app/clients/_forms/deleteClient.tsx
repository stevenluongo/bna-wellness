"use client";

import { toast } from "react-toastify";
import { deleteClient } from "../_actions";
import { redirect } from "next/navigation";

export default function DeleteClientForm({ id }: { id: string }) {
  const deleteClientWithId = deleteClient.bind(null, id);

  const action = () => {
    deleteClientWithId();
    toast.success("Client deleted");
    redirect("/clients");
  };

  return (
    <form action={action}>
      <button type="submit">Delete</button>
    </form>
  );
}
