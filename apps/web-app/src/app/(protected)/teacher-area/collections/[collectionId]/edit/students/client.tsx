"use client";
import { InsertStudentModal } from "./insert-student-modal";
import { DataTable } from "@components";
import { columns } from "./table-columns";
import {
  useRemoveUserFromCollectionMutation,
  useListStudentsOfCollectionQuery,
} from "@endpoints";
import { Router, useParamsState, useLocalStorageState } from "@infrastructure";

export const pageSize = 10;

const Page = ({ collectionId }) => {
  // const collectionId = Number(strId);

  const { params, setParams } = useParamsState({
    page: "0",
  });

  const removeMutation = useRemoveUserFromCollectionMutation({});
  const studentsQuery = useListStudentsOfCollectionQuery({
    collectionId,
    page: Number(params.page),
    pageSize,
  });
  return (
    <div>
      <InsertStudentModal collectionId={collectionId} />
      <DataTable
        data={studentsQuery?.data!}
        columns={columns}
        pagination={{
          pageSize: 10,
          currentPage: 0,
          totalRowCount: 10,
          setCurrentPage: () => {},
        }}
      />
    </div>
  );
};

export default Page;
