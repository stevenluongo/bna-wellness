"use client";

import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { User } from "@/lib/types";
import Input from "./_input";
import { createUser } from "./_actions";

export default function Form() {
  const { register, handleSubmit, reset } = useForm<User>();
  const { data: session } = useSession();
  const action: () => void = handleSubmit(async (data) => {
    await createUser(data);
    signIn();
    reset();
  });
  return (
    <form action={action} className="flex flex-col items-center space-y-2">
      {session?.user.username}
      <Input placeholder="First Name" {...register("firstName")} />
      <Input placeholder="Last Name" {...register("lastName")} />
      <Input placeholder="Username" {...register("username")} />
      <Input placeholder="Password" type="password" {...register("password")} />

      <button
        className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
        type="submit"
      >
        Confirm
      </button>
    </form>
  );
}
