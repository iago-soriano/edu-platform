"use client";

import { DataTable } from "@components/ui/table";
import { columns } from "./columns";

export const TrendingActivitiesDataTable = ({ data, page, pageSize }) => {
  return (
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
};
