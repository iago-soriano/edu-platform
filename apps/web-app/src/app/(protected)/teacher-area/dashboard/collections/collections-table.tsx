import { Dispatch, SetStateAction, useMemo } from "react";
import { useRouter } from "next/navigation";
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
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components";
import { Router, getLocaleDateTimeFromISO } from "@infrastructure";

const columnHelper =
  createColumnHelper<
    CollectionListResponse["isOwnerOf"]["collections"][number]
  >();

export const CollectionsTable = ({
  collections,
  pagination: { totalRowCount, pageSize, currentPage, setCurrentPage },
}: {
  collections: CollectionListResponse["isOwnerOf"]["collections"];
  pagination: {
    totalRowCount: number;
    pageSize: number;
    currentPage: number;
    setCurrentPage: (page: number) => unknown;
  };
}) => {
  const router = useRouter();

  const columns = useMemo(
    () => [
      columnHelper.group({
        id: "name",
        header: () => <span></span>,
        columns: [
          columnHelper.accessor("name", {
            header: () => <p className="text-left">Name</p>,
            cell: (info) => <p className="text-left">{info.getValue()}</p>,
            // size: 250,
          }),
        ],
      }),
      columnHelper.group({
        id: "settings",
        header: () => <span>Settings</span>,
        columns: [
          columnHelper.accessor("notifyOwnerOnStudentOutput", {
            header: () => (
              <Tooltip content="Notifications">
                <span className="flex flex-row justify-center">
                  <Icons.NOTIFICATION />
                </span>
              </Tooltip>
            ),
            cell: (info) => (
              <p className="flex flex-row justify-center">
                {info.getValue() ? (
                  <Icons.NOTIFICATION />
                ) : (
                  <Icons.NOTIFICATIONSLASH />
                )}
              </p>
            ),
            // size: 250,
          }),
          columnHelper.accessor("isPrivate", {
            header: () => (
              <Tooltip content="Privacy">
                <span className="flex flex-row justify-center">
                  <Icons.CAN_SEE size={16} />
                </span>
              </Tooltip>
            ),
            cell: (info) => (
              <p className="flex flex-row justify-center">
                {info.getValue() ? (
                  <Icons.CAN_SEE size={16} />
                ) : (
                  <Icons.CANT_SEE size={16} />
                )}
              </p>
            ),
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
            cell: (info) => getLocaleDateTimeFromISO(info.getValue()),
            // size: 200,
          }),
        ],
      }),
      columnHelper.group({
        id: "id",
        header: () => <span></span>,
        columns: [
          columnHelper.accessor("id", {
            header: () => <span>Edit</span>,
            cell: (info) => (
              <button
                onClick={() =>
                  router.push(Router.editCollection(info.getValue()))
                }
              >
                <Icons.CAN_SEE />
              </button>
            ),
          }),
        ],
      }),
    ],
    [router]
  );

  const table = useReactTable({
    data: collections,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const totalPages = Math.ceil(totalRowCount / pageSize);

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className="text-center"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
          <TableRow>
            {table.getHeaderGroups()[1].headers.map((header) => (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className="text-center"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
          {/* ))} */}
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={currentPage + 1 === pageNumber}
                  onClick={() => setCurrentPage(pageNumber - 1)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              disabled={Math.min(currentPage + 1, totalRowCount) === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
        <div className="col-start-3 col-span-1 flex flex-row items-center justify-end mr-3">
          {/* pagination summary */}
          Showing {Math.min(currentPage * pageSize + 1, totalRowCount)} to{" "}
          {Math.min((currentPage + 1) * pageSize, totalRowCount)} of{" "}
          {totalRowCount}
        </div>
      </Pagination>
    </div>
  );
};
