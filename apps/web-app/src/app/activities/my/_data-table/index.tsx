"use client";
import { DataTable } from "@components/ui/table";
import { columns } from "./columns";

export const MyActivitiesDataTable = ({ data, page, pageSize }) => {
  return (
    <DataTable
      columns={columns}
      data={data?.data || []}
      emptyGridMessage="You do not have any activities yet"
      pagination={{
        totalRowCount: data?.pagination?.totalCount || 0,
        pageSize,
        currentPage: Number(page),
      }}
    />
  );
};
