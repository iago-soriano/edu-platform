import { Icons } from "@components";
import {
  useSaveContentMutation,
  useUpdateVersionStatusMutation,
  useDeleteDraftVersionMutation,
  VersionQueryResultType,
} from "@infrastructure";
import { useState } from "react";
import { redirect } from "next/navigation";
import { ConfirmDeleteModal, ConfirmPublishModal } from "..";
import { twMerge } from "tailwind-merge";

const footerButtonsClasses =
  "inline-block rounded border-2 border-accent p-2 flex items-center justify-center w-[35%] [&>span]:mx-2";
const RemoveButton = (props) => (
  <button {...props} className={twMerge(footerButtonsClasses, props.className)}>
    <Icons.TRASH size={20} /> <span>Remover</span>
  </button>
);
const PublishButton = (props) => (
  <button {...props} className={twMerge(footerButtonsClasses, props.className)}>
    <Icons.PUBLISH size={25} /> <span>Publicar</span>
  </button>
);

const NewItemButton = ({ children, onClick }) => (
  <button
    className="p-4 flex items-center hover:bg-surface1 hover:bg-opacity-70 w-full rounded-lg"
    onClick={() => {
      onClick();
    }}
  >
    <Icons.PLUS size={20} className="text-accent" />
    <span className="inline-block mx-2">{children}</span>
  </button>
);
const NewItemHeader = ({ children }) => <h5 className="p-2">{children}</h5>;

interface OptionsMenuProps {
  version: VersionQueryResultType;
  onClose: () => void;
  activityId: any;
  versionId: any;
}

export const OptionsMenu = ({
  onClose,
  activityId,
  versionId,
  version,
}: OptionsMenuProps) => {
  const deleteVersionMutation = useDeleteDraftVersionMutation({
    activityId,
    versionId,
    onSuccess: () => {
      setOpenConfirmDeleteModal(false);
      redirect("dashboard/my-activities/draft");
    },
  });
  const statusUpdateMutation = useUpdateVersionStatusMutation({
    activityId,
    versionId,
  });
  const saveContentMutation = useSaveContentMutation({
    activityId,
    versionId,
    onSuccess: onClose,
  });

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [openConfirmPublishModal, setOpenConfirmPublishModal] = useState(false);

  const handleOutsideClick = (e) => {
    if (e.target.id === "outside-options-menu") {
      onClose();
    }
  };

  const order = version.data.elements.length;

  return (
    // Backdrop
    <div
      className="fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-end z-10 bg-black/70"
      id="outside-options-menu"
      onClick={handleOutsideClick}
    >
      {/* menu */}
      <div
        className="rounded-lg border-black border p-2 h-full w-[90%] md:w-[50%] lg:w-[30%] bg-surface2 relative"
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
              saveContentMutation.mutate({ type: "Video", payload: {}, order })
            }
          >
            Vídeo
          </NewItemButton>
          <NewItemButton
            onClick={() =>
              saveContentMutation.mutate({ type: "Text", payload: {}, order })
            }
          >
            Texto
          </NewItemButton>
          <NewItemButton
            onClick={() =>
              saveContentMutation.mutate({ type: "Image", payload: {}, order })
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
            <RemoveButton
              className="text-accent"
              onClick={() => setOpenConfirmDeleteModal(true)}
            />
            <PublishButton
              className="bg-accent text-white"
              onClick={() => setOpenConfirmPublishModal(true)}
            />
          </div>
        </div>
      </div>
      {openConfirmDeleteModal && (
        <ConfirmDeleteModal
          onClose={() => setOpenConfirmDeleteModal(false)}
          deleteMutation={() => deleteVersionMutation.mutate()}
        />
      )}
      {openConfirmPublishModal && (
        <ConfirmPublishModal
          onClose={() => setOpenConfirmPublishModal(false)}
          publishMutation={() =>
            statusUpdateMutation.mutate({ newActivityStatus: "Published" })
          }
        />
      )}
    </div>
  );
};
