"use client";
import { useState, useEffect } from "react";
import { StudentListing } from "./student-listing";
import { InsertStudentModal } from "./insert-student-modal";
import {
  useSaveCollectionMutation,
  useGetCollectionQuery,
  useCreateNewActivityMutation,
} from "@endpoints";

const Page = ({ params: { collectionId: strId } }) => {
  const collectionId = Number(strId);
  const collectionQuery = useGetCollectionQuery({ collectionId });

  const [isInsertStudentModalOpen, setIsInsertStudentModalOpen] =
    useState(false);
  return (
    <div>
      <div className="w-full flex justify-between p-2 mt-5">
        <h5>{collectionQuery.data?.name}</h5>
        <button
          onClick={() => setIsInsertStudentModalOpen(true)}
          className="h-10 w-38 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
        >
          + New Student
        </button>
      </div>
      <StudentListing collectionId={collectionId} />
      {isInsertStudentModalOpen && (
        <InsertStudentModal
          collectionId={collectionId}
          onClose={() => setIsInsertStudentModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Page;
