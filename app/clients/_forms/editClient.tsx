"use client";

import { toast } from "react-toastify";
import { editClient, fetchClientById } from "../_actions";
import Input from "@/app/register/_input";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useClientsStore } from "@/lib/store";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type NonNullableClientWithAddress = NonNullable<
  ThenArg<ReturnType<typeof fetchClientById>>
>;

export default function EditClientForm({
  client,
}: {
  client: NonNullableClientWithAddress;
}) {
  const toggleEditClientModal = useClientsStore(
    (state) => state.toggleEditClientModal
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm<NonNullableClientWithAddress>({
    defaultValues: {
      firstName: client?.firstName,
      lastName: client?.lastName,
      email: client?.email,
      age: client?.age,
      homeNumber: client?.homeNumber,
      cellNumber: client?.cellNumber,
      image: client?.image,
      address: {
        line1: client?.address?.line1,
        line2: client?.address?.line2,
        city: client?.address?.city,
        state: client?.address?.state,
        postalCode: client?.address?.postalCode,
        country: client?.address?.country,
      },
    },
  });

  useEffect(() => {
    reset({
      firstName: client?.firstName,
      lastName: client?.lastName,
      email: client?.email,
      age: client?.age,
      homeNumber: client?.homeNumber,
      cellNumber: client?.cellNumber,
      image: client?.image,
      address: {
        line1: client?.address?.line1,
        line2: client?.address?.line2,
        city: client?.address?.city,
        state: client?.address?.state,
        postalCode: client?.address?.postalCode,
        country: client?.address?.country,
      },
    });
  }, [client, reset]);

  if (!client) return redirect("/clients");

  const editClientWithId = editClient.bind(null, client.id);

  const action: () => void = handleSubmit(async (data) => {
    const fd = new FormData();

    const changes: Partial<NonNullableClientWithAddress> = {};

    Object.entries(dirtyFields).forEach(([key, value]) => {
      if (value && typeof value !== "object") {
        // @ts-ignore
        changes[key] = data[key as keyof NonNullableClientWithAddress]!;
      } else {
        Object.entries(value).forEach(([key, value]) => {
          if (value) {
            // @ts-ignore
            changes[`address.${key}`] =
              data["address"]![
                key as keyof NonNullableClientWithAddress["address"]
              ];
          }
        });
      }
    });

    // check if there are any changes
    if (Object.keys(changes).length === 0) {
      toast.info("No changes detected");
      return;
    }

    // loop through changes and add to form data
    Object.entries(changes).forEach(([key, value]) => {
      fd.append(key, JSON.stringify(value));
    });

    // update client
    await editClientWithId(fd);

    toast.success("Client successfully updated");

    toggleEditClientModal(null);
  });

  return (
    <form action={action}>
      <Link href={`/clients/id/${client.id}`}>Back</Link>
      <Input placeholder="First Name" {...register("firstName")} required />
      <Input placeholder="Last Name" {...register("lastName")} required />
      <Input type="email" placeholder="Email" {...register("email")} />
      <Input
        type="number"
        placeholder="Age"
        {...register("age")}
        min={18}
        max={100}
      />
      <Input placeholder="Home Number" {...register("homeNumber")} />
      <Input placeholder="Cell Number" {...register("cellNumber")} />
      <Input placeholder="Image URL" {...register("image")} />
      <Input placeholder="Address Line 1" {...register("address.line1")} />
      <Input placeholder="Address Line 2" {...register("address.line2")} />
      <Input placeholder="City" {...register("address.city")} />
      <Input placeholder="State" {...register("address.state")} />
      <Input placeholder="Postal Code" {...register("address.postalCode")} />
      <Input placeholder="Country" {...register("address.country")} />
      <button type="submit">Edit</button>
    </form>
  );
}
