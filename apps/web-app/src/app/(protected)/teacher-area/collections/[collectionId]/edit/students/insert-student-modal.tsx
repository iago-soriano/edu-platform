import { Modal, Input, Icons, successToast } from "@components";
import { useState } from "react";
import { useInsertUserInCollectionMutation } from "@endpoints";

interface InsertStudentModalProps {
  collectionId: number;
}

export const InsertStudentModal = ({
  collectionId,
}: InsertStudentModalProps) => {
  const insertMutation = useInsertUserInCollectionMutation(collectionId, {
    onSuccess: () => successToast("New stuent inserted successfully!"),
  });
  const [email, setEmail] = useState("");
  const [isInsertStudentModalOpen, setIsInsertStudentModalOpen] =
    useState(false);
  return (
    <>
      <button
        onClick={() => setIsInsertStudentModalOpen(true)}
        className="h-10 w-38 whitespace-nowrap bg-accent p-2 text-white rounded font-bold transition-opacity hover:opacity-80"
      >
        + New Student
      </button>
      {isInsertStudentModalOpen && (
        <Modal
          className="max-w-[550px] w-[90%] p-4"
          onClose={() => setIsInsertStudentModalOpen(false)}
          modalKey="insert-student-into-collection"
        >
          <p>
            Type in the e-mail of the user you wish to add to this collection
          </p>
          <div className="flex items-center">
            <Input
              className="w-[90%]"
              placeholder="Student's e-mail"
              onChange={(e) => {
                setEmail((e.target as any).value);
              }}
            />
            <div // TODO : icon button
              className="cursor-pointer border-2 p-2 h-fit mt-4 mx-1 rounded-md"
              onClick={async () => {
                await insertMutation.mutateAsync({
                  collectionId,
                  studentEmail: email,
                });
                console.log("inserted");
                setIsInsertStudentModalOpen(false);
              }}
            >
              <Icons.CHECK size={24} />
            </div>
          </div>
          <br />
        </Modal>
      )}
    </>
  );
};
