import { Modal, Input, Icons, successToast } from "@components";
import { useState } from "react";
import { useInsertUserInCollectionMutation } from "@endpoints";

interface InsertStudentModalProps {
  collectionId: number;
  onClose: () => any;
}

export const InsertStudentModal = ({
  onClose,
  collectionId,
}: InsertStudentModalProps) => {
  const insertMutation = useInsertUserInCollectionMutation({
    onSuccess: () => successToast("Usuário inserido com sucesso!"),
  });
  const [email, setEmail] = useState("");

  return (
    <Modal
      className="max-w-[550px] w-[90%] p-4"
      onClose={onClose}
      modalKey="insert-student-into-collection"
    >
      <p>Digite o e-mail do estudante que deseja adicionar à coleção</p>
      <div className="flex items-center">
        <Input
          placeholder="E-mail do estudante"
          onChange={(e) => {
            setEmail((e.target as any).value);
          }}
        />
        <div className="cursor-pointer border-2 p-2 h-fit mt-4 mx-1 rounded-md">
          <Icons.CHECK
            onClick={() => {
              insertMutation.mutate({ collectionId, studentEmail: email });
            }}
            size={24}
          />
        </div>
      </div>
      <br />
    </Modal>
  );
};
