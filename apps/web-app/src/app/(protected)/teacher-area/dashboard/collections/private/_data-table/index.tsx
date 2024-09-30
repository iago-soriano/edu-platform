"use client";
import { DataTable } from "@components";
import { columns } from "./columns";
export const PrivateCollectionsDataTable = ({ data, page, pageSize }) => (
  <DataTable
    columns={columns}
    data={data?.data || []}
    pagination={{
      totalRowCount: data?.pagination?.totalCount || 0,
      pageSize,
      currentPage: Number(page),
    }}
  />
);
