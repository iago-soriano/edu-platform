import { useState } from "react";
import { ConfirmModal, Icons, Spinner, PanelButton } from "@components";
import { useCreateNewActivityMutation } from "@endpoints";
import { Router } from "@infrastructure";
import { useRouter } from "next/navigation";

export const ConfirmCollectionModal = ({
  collectionId,
  onClose,
  collectionsQuery,
}) => {
  const router = useRouter();

  const [selected, setSelected] = useState(collectionId);
  const createActivityMutation = useCreateNewActivityMutation({
    collectionId: selected,
    onSuccess: ({ activityId, versionId }) => {
      router.push(Router.editActivity({ activityId, versionId }));
    },
  });

  return (
    <ConfirmModal
      onClose={onClose}
      confirmAction={() => createActivityMutation.mutate()}
      confirmButton={{ Icon: Icons.PLUS, text: "Criar atividade" }}
      title="Selecione uma coleção"
    >
      <>
        <p>A atividade será criada na coleção selecionada</p>
        {createActivityMutation.isPending ||
        createActivityMutation.isSuccess ? (
          <Spinner />
        ) : (
          <div className="my-3">
            {collectionsQuery?.data?.isOwnerOf?.map((coll) => (
              <PanelButton
                selected={coll.id === Number(selected)}
                onClick={() => setSelected(coll.id)}
              >
                {coll.name}
              </PanelButton>
            ))}
          </div>
        )}
      </>
    </ConfirmModal>
  );
};
