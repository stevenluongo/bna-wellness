"use client";

import { useSession } from "next-auth/react";
import { createTerminal } from "../_actions";
import { toast } from "react-toastify";

export default function CreateTerminalForm() {
  const { data: session } = useSession();
  const id = session?.user?.id;

  if (!id) {
    return null;
  }

  const createTerminalWithUserId = createTerminal.bind(null, id);

  const action = async () => {
    await createTerminalWithUserId();
    toast.success("Terminal created");
  };

  return (
    <form action={action}>
      <button type="submit">Create</button>
    </form>
  );
}
