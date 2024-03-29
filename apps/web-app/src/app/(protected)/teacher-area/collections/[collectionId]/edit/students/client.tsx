"use client";
import { InsertStudentModal } from "./insert-student-modal";
import { useMemo, useState } from "react";
import {
  DataTable,
  LoadingErrorData,
  Frame,
  ConfirmModal,
  Button,
} from "@components";
import { useListStudentsOfCollectionQuery } from "@endpoints";
import { Router, useParamsState, useLocalStorageState } from "@infrastructure";
import { ConfirmRemoveStudentModal } from "./confirm-remove-modal";
// const pageSize = 10;

const Page = ({ collectionId, page, pageSize }) => {
  const { params, setParams } = useParamsState({
    page,
  });

  const [loading, setLoading] = useState(false);
  const studentsQuery = useListStudentsOfCollectionQuery({
    collectionId,
    page: Number(params.page),
    pageSize: Number(pageSize),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
        size: 200,
      },
      {
        accessorKey: "email",
        header: "E-mail",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "id",
        header: "Remove",
        cell: (info) => (
          <div className="flex justify-center">
            <ConfirmRemoveStudentModal
              participation={info.row.original}
              collectionId={collectionId}
            />
          </div>
        ),
        size: 70,
      },
    ],
    []
  );

  return (
    <div>
      <div className="w-full p-4 flex justify-end">
        <InsertStudentModal collectionId={collectionId} />
      </div>
      <LoadingErrorData
        loading={studentsQuery.isPending}
        error={studentsQuery.error}
        hasData={!!studentsQuery?.data?.data?.length}
        data={
          <Frame>
            <DataTable
              className="min-h-[50vh] justify-between"
              data={studentsQuery?.data?.data || []}
              columns={columns}
              pagination={{
                pageSize,
                currentPage: Number(params.page),
                totalRowCount: studentsQuery?.data?.pagination?.totalCount || 0,
                setCurrentPage: (e) => setParams({ page: e }),
              }}
            />
          </Frame>
        }
      />
    </div>
  );
};

export default Page;
