"use client";

import { DataTable } from "@components/ui/table";
import { columns } from "./columns";
import { useState } from "react";
import { ImportActivityDialog } from "@components/ImportActivityDialog";
import { useSearchParams } from "next/navigation";

export const TrendingActivitiesDataTable = ({ data, page, pageSize }) => {
  const searchParams = useSearchParams();
  const selectedActivityId = searchParams.get("selectedActivityId");

  const setSelectedActivityId = (id: string | null) => {
    const url = new URL(window.location.href);

    if (id) url.searchParams.set("selectedActivityId", id);
    else url.searchParams.delete("selectedActivityId");

    window.history.pushState({}, "", url);
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.data || []}
        pagination={{
          totalRowCount: data?.pagination?.totalCount || 0,
          pageSize,
          currentPage: Number(page),
        }}
        handleRowClick={(args) => {
          // console.log((args.original as any)?.id);
          setSelectedActivityId((args.original as any)?.id ?? null);
        }}
      />

      <ImportActivityDialog
        setOpen={setSelectedActivityId}
        selectedActivityId={selectedActivityId}
      />
    </>
  );
};
