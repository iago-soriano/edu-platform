import {
  Icons,
  NewItemButton,
  RemoveButton,
  PublishButton,
  ConfirmModal,
} from "@components";
import {
  useSaveContentMutation,
  useUpdateVersionStatusMutation,
  useDeleteDraftVersionMutation,
  ReturnGetActivityVersion,
} from "@endpoints";
import { ContentTypes, VersionStatus } from "@edu-platform/common";
import { useState } from "react";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Router } from "@infrastructure";

const NewItemHeader = ({ children }) => <h5 className="p-2">{children}</h5>;

interface OptionsMenuProps {
  version: ReturnGetActivityVersion;
  onClose: () => void;
  activityId: any;
  versionId: any;
  isOpen: boolean;
  scrollToBottom?: () => void;
}

export const OptionsMenu = ({
  onClose,
  activityId,
  versionId,
  version,
  isOpen,
  scrollToBottom,
}: OptionsMenuProps) => {
  const deleteVersionMutation = useDeleteDraftVersionMutation({
    onSuccess: () => {
      setOpenConfirmDeleteModal(false);
      redirect(Router.teacherHome);
    },
  });
  const statusUpdateMutation = useUpdateVersionStatusMutation({
    onSuccess: () => {
      setOpenConfirmDeleteModal(false);
      redirect(Router.teacherHome);
    },
  });
  const saveContentMutation = useSaveContentMutation({
    onSuccess: () => {
      onClose();
      // scrollToBottom();
    },
  });

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [openConfirmPublishModal, setOpenConfirmPublishModal] = useState(false);

  const handleOutsideClick = (e) => {
    if (e.target.id === "outside-options-menu") {
      onClose();
    }
  };

  const order = version?.elements?.length;
  const openClasses = isOpen
    ? "opacity-100 -translate-x-0"
    : "translate-x-3 pointer-events-none opacity-0";

  return (
    // Backdrop
    <div
      className={twMerge(
        "transition-all",
        isOpen &&
          "fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-end z-10 bg-black/70"
      )}
      id="outside-options-menu"
      onClick={handleOutsideClick}
    >
      {/* menu */}
      <div
        className={twMerge(
          "rounded-lg border-black border p-2 h-full w-[90%] md:w-[50%] lg:w-[30%] bg-surface2 relative transition-all",
          openClasses
        )}
        role="dialog"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <Icons.X className="cursor-pointer p-1" onClick={onClose} size={35} />
        </div>
        {/* Content */}
        <div className="h-full">
          <br />
          <NewItemHeader>Conteúdos</NewItemHeader>
          <NewItemButton
            onClick={() =>
              saveContentMutation.mutate({
                activityId,
                versionId,
                type: ContentTypes.Video,
                payload: { video: {} },
                order,
              })
            }
          >
            Vídeo
          </NewItemButton>
          <NewItemButton
            onClick={() =>
              saveContentMutation.mutate({
                activityId,
                versionId,
                type: ContentTypes.Text,
                payload: { text: {} },
                order,
              })
            }
          >
            Texto
          </NewItemButton>
          <NewItemButton
            onClick={() =>
              saveContentMutation.mutate({
                activityId,
                versionId,
                type: ContentTypes.Image,
                payload: { image: {} },
                order,
              })
            }
          >
            Imagem
          </NewItemButton>
          <br />
          <NewItemHeader>Perguntas</NewItemHeader>
          <NewItemButton onClick={() => {}}>Dissertativa</NewItemButton>
          <NewItemButton onClick={() => {}}>Múltipla escolha</NewItemButton>
          {/* Footer */}
          <div className="absolute bottom-0 p-2 my-3 flex justify-around w-full">
            <RemoveButton onClick={() => setOpenConfirmDeleteModal(true)} />
            <PublishButton
              onClick={() => setOpenConfirmPublishModal(true)}
              disabled={!version?.elements?.length}
            />
          </div>
        </div>
      </div>
      {openConfirmDeleteModal && (
        <ConfirmModal
          onClose={() => setOpenConfirmDeleteModal(false)}
          confirmAction={() =>
            deleteVersionMutation.mutate({ activityId, versionId })
          }
          title="Ao remover este rascunho, todas as alterações serão perdidas"
          children={
            <>
              <br />
              <p>Deseja remover o rascunho mesmo assim?</p>
              <br />
            </>
          }
          confirmButton={{ Icon: () => <Icons.TRASH />, text: "Remover" }}
        />
      )}
      {openConfirmPublishModal && (
        <ConfirmModal
          onClose={() => setOpenConfirmPublishModal(false)}
          confirmAction={() =>
            statusUpdateMutation.mutate({
              activityId,
              versionId,
              newActivityStatus: VersionStatus.Published,
            })
          }
          title="Publicar rascunho"
          children={
            <>
              <br />
              <p>Deseja publicar o rascunho?</p>
              <br />
            </>
          }
          confirmButton={{ Icon: () => <Icons.PUBLISH />, text: "Publicar" }}
        />
      )}
    </div>
  );
};
