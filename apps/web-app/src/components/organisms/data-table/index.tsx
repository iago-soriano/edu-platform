"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  ColumnDefBase,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
} from "@components";
import { twMerge } from "tailwind-merge";
export * from "./config";
import { usePathname } from "next/navigation";

interface PaginationProps {
  totalRowCount: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage?: (page: number) => unknown;
}

interface DataTableProps<TData> {
  columns: any[]; // TODO: fix this type when this issue is resolved https://github.com/TanStack/table/issues/5423
  data: TData[];
  pagination: PaginationProps;
  className?: string;
}

export const DataTable = <TData, TValue>({
  data,
  columns,
  pagination: { totalRowCount, pageSize, currentPage },
  className,
}: DataTableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    columnResizeMode: "onChange",
  });
  const pathName = usePathname();

  return (
    <div
      className={twMerge(
        "flex flex-col min-h-[50vh] justify-between",
        className
      )}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width:
                        header.getSize() === Number.MAX_SAFE_INTEGER
                          ? "auto"
                          : header.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{
                    width:
                      cell.column.getSize() === Number.MAX_SAFE_INTEGER
                        ? "auto"
                        : cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        path={pathName}
        totalRowCount={totalRowCount}
        pageSize={pageSize}
      />
    </div>
  );
};
