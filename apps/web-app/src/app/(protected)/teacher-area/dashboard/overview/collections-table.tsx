import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import {
  useCreateNewActivityMutation,
  useListCollectionsQuery,
  useSaveCollectionMutation,
  CollectionListResponse,
} from "@endpoints";
import {
  Icons,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components";

const columnHelper =
  createColumnHelper<
    CollectionListResponse["isOwnerOf"]["collections"][number]
  >();

const CountCell = ({ children }) => (
  <span className="text-center">{children}</span>
);
const columns = [
  columnHelper.group({
    id: "name",
    header: () => <span></span>,
    columns: [
      columnHelper.accessor("name", {
        header: () => <span>Name</span>,
        cell: (info) => info.getValue(),
        // size: 250,
      }),
    ],
  }),
  columnHelper.group({
    id: "activities",
    header: "Activities",
    columns: [
      columnHelper.accessor("totalActivitiesCount", {
        header: () => <span>Total</span>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("draftVersionsCount", {
        header: () => <span>Draft</span>,
        cell: (info) => info.getValue(),
        // size: 50,
      }),
      columnHelper.accessor("publishedVersionsCount", {
        header: () => <span>Published</span>,
        cell: (info) => info.getValue(),
        // size: 50,
      }),
      columnHelper.accessor("archivedVersionsCount", {
        header: () => <span>Archived</span>,
        cell: (info) => info.getValue(),
        // size: 50,
      }),
    ],
  }),
  columnHelper.group({
    id: "last-edit",
    header: () => <span></span>,
    columns: [
      columnHelper.accessor("updatedAt", {
        header: () => <span>Last Edited</span>,
        cell: (info) => info.getValue(),
        // size: 200,
      }),
    ],
  }),
  columnHelper.group({
    id: "id",
    header: () => <span></span>,
    columns: [
      columnHelper.accessor("id", {
        // size: 50,
        header: () => <span>Edit</span>,
        cell: (info) => (
          <button onClick={() => console.log(info.getValue())}>
            <Icons.CAN_SEE />
          </button>
        ),
      }),
    ],
  }),
];

export const CollectionsTable = ({
  collections,
}: {
  collections: CollectionListResponse["isOwnerOf"]["collections"];
}) => {
  const table = useReactTable({
    data: collections,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {/* {table.getHeaderGroups().map((headerGroup) => ( */}
        <TableRow key={table.getHeaderGroups()[0].id}>
          {table.getHeaderGroups()[0].headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              className="text-center"
              // style={{
              //   width: header.column.columnDef.meta?.width,
              // }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
        <TableRow key={table.getHeaderGroups()[1].id}>
          {table.getHeaderGroups()[1].headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              className="text-center"
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
        {/* ))} */}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className="text-center"
                // style={{
                //   width: cell.column.getSize(),
                // }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
