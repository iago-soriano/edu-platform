"use client";
import { Icons } from "@components";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { ListParticipantsOfCollectionResponseBody } from "@edu-platform/common";

const columnHelper =
  createColumnHelper<ListParticipantsOfCollectionResponseBody[number]>();

export const columns = [
  columnHelper.accessor("name", {
    id: "name",
    header: () => <span>Name</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: () => <span>E-mail</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    id: "id",
    header: () => <span>Remove</span>,
    cell: (info) => <Icons.TRASH>{info.getValue()}</Icons.TRASH>,
  }),
];
