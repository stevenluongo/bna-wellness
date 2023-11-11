"use client";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createClient, fetchClientById } from "../_actions";
import Input from "@/app/register/_input";
import { useForm } from "react-hook-form";
import { faker } from "@faker-js/faker";
import { redirect } from "next/navigation";
import { useClientsStore } from "@/lib/store";
import { Button } from "@mantine/core";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type NonNullableClientWithAddress = NonNullable<
  ThenArg<ReturnType<typeof fetchClientById>>
>;

export default function CreateClientForm() {
  const { register, handleSubmit, setValue } =
    useForm<NonNullableClientWithAddress>();
  const { data: session } = useSession();
  const id = session?.user?.id;

  if (!id) {
    return null;
  }

  function createRandomClient() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      notes: [faker.lorem.paragraph()],
      age: faker.number.int({
        min: 18,
        max: 100,
      }),
      homeNumber: faker.phone.number(),
      cellNumber: faker.phone.number(),
      image: faker.image.avatar(),
      address: {
        id: faker.string.uuid(),
        line1: faker.location.streetAddress(),
        line2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
    };
  }

  const toggleCreateClientModal = useClientsStore(
    (state) => state.toggleCreateClientModal
  );

  const action: () => void = handleSubmit(async (data) => {
    const fd = new FormData();

    // Append top-level fields
    Object.entries(data).forEach(([key, value]) => {
      if (value && typeof value !== "object") {
        fd.append(
          key,
          Array.isArray(value) ? JSON.stringify(value) : value.toString()
        );
      }
    });

    // Append nested address fields
    if (data.address) {
      Object.entries(data.address).forEach(([key, value]) => {
        if (value) {
          fd.append(`address.${key}`, value);
        }
      });
    }

    const { error } = JSON.parse(await createClient(fd));

    if (error) {
      toast.error("Error creating client");
      return;
    }

    toast.success("Client created");
    toggleCreateClientModal();
  });

  const formatFields = () => {
    const client = createRandomClient();
    setValue("firstName", client.firstName);
    setValue("lastName", client.lastName);
    setValue("email", client.email);
    setValue("notes", client.notes);
    setValue("age", client.age);
    setValue("homeNumber", client.homeNumber);
    setValue("cellNumber", client.cellNumber);
    setValue("image", client.image);
    setValue("address.line1", client.address.line1);
    setValue("address.line2", client.address.line2);
    setValue("address.city", client.address.city);
    setValue("address.state", client.address.state);
    setValue("address.postalCode", client.address.postalCode);
    setValue("address.country", client.address.country);
  };

  return (
    <>
      <form action={action}>
        <Input placeholder="First Name" {...register("firstName")} required />
        <Input placeholder="Last Name" {...register("lastName")} required />
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input placeholder="Notes" {...register("notes")} />
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
        <div className="flex gap-4">
          <Button
            variant="filled"
            type="submit"
            className="bg-[#2D68FE] font-inter text-white flex gap-x-2 items-center py-2 px-4 rounded-lg"
          >
            Create
          </Button>
          <Button
            variant="filled"
            onClick={formatFields}
            className="bg-[#2D68FE] font-inter text-white flex gap-x-2 items-center py-2 px-4 rounded-lg"
          >
            Generate Random Data
          </Button>
        </div>
      </form>
    </>
  );
}
