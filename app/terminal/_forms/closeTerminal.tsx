"use client";

import { useSession } from "next-auth/react";
import { closeTerminal } from "../_actions";
import { toast } from "react-toastify";

export default function CloseTerminalForm({
  terminalId,
}: {
  terminalId: string;
}) {
  const { data: session } = useSession();
  const id = session?.user?.id;

  if (!id) {
    return null;
  }

  const closeTerminalWithId = closeTerminal.bind(null, terminalId);

  const action = () => {
    const fd = new FormData();
    fd.append("closedById", id);
    closeTerminalWithId(fd);
    toast.success("Terminal closed");
  };

  return (
    <form action={action}>
      <button type="submit">Close</button>
    </form>
  );
}
