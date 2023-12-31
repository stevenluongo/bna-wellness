"use client";

import { toast } from "react-toastify";
import { deleteClient } from "../_actions";
import { redirect } from "next/navigation";
import { useClientsStore } from "@/lib/store";

export default function DeleteClientForm({ id }: { id?: string }) {
  const toggleDeleteClientModal = useClientsStore(
    (state) => state.toggleDeleteClientModal
  );
  if (!id) {
    return null;
  }

  const deleteClientWithId = deleteClient.bind(null, id);

  const action = () => {
    deleteClientWithId();
    toast.success("Client deleted");
    toggleDeleteClientModal("");
  };

  return (
    <form action={action}>
      <button type="submit">Delete</button>
    </form>
  );
}
