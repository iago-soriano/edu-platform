import { Modal, Button } from "@components";
import { useState } from "react";
import {
  useRemoveUserFromCollectionMutation,
  useListStudentsOfCollectionQuery,
} from "@endpoints";

export const ConfirmRemoveStudentModal = ({ participation, collectionId }) => {
  const [open, setOpen] = useState(false);
  const removeMutation = useRemoveUserFromCollectionMutation({});

  return (
    <>
      <Button
        withIcon="TRASH"
        size="icon"
        variant="destructive"
        onClick={() => setOpen(true)}
      />
      {open && (
        <Modal
          modalKey="confirm-modal"
          onClose={() => setOpen(false)}
          className="max-w-[550px] w-[90%] p-4"
        >
          Are you sure you wish to remove {participation.name} from this
          collection?
          <div className="p-2 my-3 mx-auto flex justify-evenly w-full">
            <Button size="lg" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size="lg"
              isLoading={removeMutation.isPending}
              onClick={async () => {
                await removeMutation.mutateAsync({
                  collectionId,
                  participationId: participation.id,
                });
                setOpen(false);
              }}
              withIcon={"TRASH"}
              variant="secondary"
            >
              Remove
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
