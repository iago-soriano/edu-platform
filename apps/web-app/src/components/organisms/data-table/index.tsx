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

interface PaginationProps {
  totalRowCount: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (page: number) => unknown;
}

interface DataTableProps<TData, TValue> {
  columns: any[]; // TODO: fix this type when this issue is resolved https://github.com/TanStack/table/issues/5423
  data: TData[];
  pagination: PaginationProps;
}

export const DataTable = <TData, TValue>({
  data,
  columns,
  pagination: { totalRowCount, pageSize, currentPage, setCurrentPage },
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    // className="flex items-center justify-center"
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
                <TableCell key={cell.id} className="text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRowCount={totalRowCount}
        pageSize={pageSize}
      />
    </>
  );
};
