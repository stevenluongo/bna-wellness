"use client";

import {
  flexRender,
  MRT_GlobalFilterTextInput,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMantineReactTable,
  MRT_RowActionMenu,
} from "mantine-react-table";
import {
  Divider,
  Flex,
  Stack,
  Table,
  Modal,
  Button,
  Menu,
} from "@mantine/core";
import { useClientsStore } from "@/lib/store";
import CreateClientForm from "./_forms/createClient";
import { useRouter } from "next/navigation";
import EditClientForm from "./_forms/editClient";
import DeleteClientForm from "./_forms/deleteClient";
import { getClients } from "./_actions";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type NonNullableClientsWithAddress = NonNullable<
  ThenArg<ReturnType<typeof getClients>>
>;

const columns = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];

const Example = ({ clients }: { clients: NonNullableClientsWithAddress }) => {
  const router = useRouter();

  const isCreateClientModalOpen = useClientsStore(
    (state) => state.isCreateClientModalOpen
  );
  const toggleCreateClientModal = useClientsStore(
    (state) => state.toggleCreateClientModal
  );
  const isDeleteClientModalOpen = useClientsStore(
    (state) => state.isDeleteClientModalOpen
  );
  const toggleDeleteClientModal = useClientsStore(
    (state) => state.toggleDeleteClientModal
  );
  const isEditClientModalOpen = useClientsStore(
    (state) => state.isEditClientModalOpen
  );
  const toggleEditClientModal = useClientsStore(
    (state) => state.toggleEditClientModal
  );
  const client = useClientsStore((state) => state.client);
  const id = useClientsStore((state) => state.id);

  const table = useMantineReactTable({
    columns,
    data: clients, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    //MRT display columns can still work, optionally override cell renders with `displayColumnDefOptions`
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    //customize the MRT components
    mantinePaginationProps: {
      rowsPerPageOptions: ["5", "10", "15"],
    },
    paginationDisplayMode: "pages",
    enableRowActions: true,

    renderRowActionMenuItems: ({ row }) => (
      <>
        <Menu.Item
          onClick={() => router.push(`/clients/id/${row.original.id}`)}
        >
          View
        </Menu.Item>
        <Menu.Item onClick={() => toggleEditClientModal(row.original)}>
          Edit
        </Menu.Item>
        <Menu.Item onClick={() => toggleDeleteClientModal(row.original.id)}>
          Delete
        </Menu.Item>
      </>
    ),
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[#2A2A2A] text-[28px] leading-[38px] font-[500]">
          Customers
        </h1>
        <button
          onClick={toggleCreateClientModal}
          className="bg-[#2D68FE] font-inter text-white flex gap-x-2 items-center py-2 px-4 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            height={24}
            width={24}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          <p className="text-sm font-[500]">Create Customer</p>
        </button>
      </div>
      <Modal
        opened={isCreateClientModalOpen}
        onClose={toggleCreateClientModal}
        title="Create Customer"
      >
        <CreateClientForm />
      </Modal>
      <Modal
        opened={isEditClientModalOpen}
        onClose={() => toggleEditClientModal(null)}
        title="Edit Customer"
      >
        <EditClientForm client={client!} />
      </Modal>
      <Modal
        opened={isDeleteClientModalOpen}
        onClose={() => toggleDeleteClientModal("")}
        title="Delete Customer"
      >
        <DeleteClientForm id={id} />
      </Modal>

      <Stack>
        <Divider />
        <Flex justify="space-between" align="center">
          {/**
           * Use MRT components along side your own markup.
           * They just need the `table` instance passed as a prop to work!
           */}
          <MRT_GlobalFilterTextInput table={table} />
          <MRT_TablePagination table={table} />
        </Flex>
        {/* Using Vanilla Mantine Table component here */}
        <Table
          captionSide="top"
          fontSize="md"
          highlightOnHover
          horizontalSpacing="xl"
          striped
          verticalSpacing="xs"
          withBorder
          withColumnBorders
        >
          {/* Use your own markup, customize however you want using the power of TanStack Table */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.Header ??
                            header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.Cell ?? cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      </Stack>
    </>
  );
};

export default Example;
