import { Icons, NewItemButton, Button, Modal } from "@components";
import {
  useSaveContentMutation,
  useSaveQuestionMutation,
  usePublishDraftMutation,
  ReturnGetActivityVersion,
} from "@endpoints";
import { ContentTypes, QuestionTypes } from "@edu-platform/common";
import { useState } from "react";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Router } from "@infrastructure";

const NewItemHeader = ({ children }) => <h5 className="p-2">{children}</h5>;

interface OptionsMenuProps {
  version?: ReturnGetActivityVersion;
  onClose: () => void;
  activityId: any;
  isOpen: boolean;
  scrollToBottom?: () => void;
}

export const OptionsMenu = ({
  onClose,
  activityId,
  version,
  isOpen,
  scrollToBottom,
}: OptionsMenuProps) => {
  const publishDraftMutation = usePublishDraftMutation({
    // onSuccess: () => {
    //   setOpenConfirmDeleteModal(false);
    //   redirect(Router.teacherHome);
    // },
  });
  const saveContentMutation = useSaveContentMutation({
    onSuccess: () => {
      onClose();
      // scrollToBottom();
    },
  });

  const saveQuestionMutation = useSaveQuestionMutation({
    onSuccess: () => {
      onClose();
      // scrollToBottom();
    },
  });

  const [openConfirmPublishModal, setOpenConfirmPublishModal] = useState(false);

  const handleOutsideClick = (e) => {
    if (e.target.id === "outside-options-menu") {
      onClose();
    }
  };

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
                type: ContentTypes.Video,
                payload: { video: {} },
              })
            }
          >
            Vídeo
          </NewItemButton>
          <NewItemButton
            onClick={() =>
              saveContentMutation.mutate({
                activityId,
                type: ContentTypes.Text,
                payload: { text: {} },
              })
            }
          >
            Texto
          </NewItemButton>
          <NewItemButton
            onClick={() =>
              saveContentMutation.mutate({
                activityId,
                type: ContentTypes.Image,
                payload: { image: {} },
              })
            }
          >
            Imagem
          </NewItemButton>
          <br />
          <NewItemHeader>Perguntas</NewItemHeader>
          <NewItemButton
            onClick={() =>
              saveQuestionMutation.mutate({
                activityId,
                type: QuestionTypes.Text,
              })
            }
          >
            Dissertativa
          </NewItemButton>
          <NewItemButton
            onClick={() =>
              saveQuestionMutation.mutate({
                activityId,
                type: QuestionTypes.MultipleChoice,
              })
            }
          >
            Múltipla escolha
          </NewItemButton>
          {/* Footer */}
          <div className="absolute bottom-0 p-2 my-3 flex justify-around w-full">
            <Button
              withIcon="PUBLISH"
              variant="action"
              size="lg"
              onClick={() => setOpenConfirmPublishModal(true)}
              disabled={false}
            >
              Publish
            </Button>
          </div>
        </div>
      </div>
      {openConfirmPublishModal && (
        <Modal
          modalKey="confirm-publish-modal"
          onClose={() => setOpenConfirmPublishModal(false)}
          className="max-w-[550px] w-[90%] p-4"
        >
          <h5>Are you sure you wish to publish this draft? </h5>
          It will become public to participants or followers of this collection
          <div className="p-2 my-3 mx-auto flex justify-evenly w-full">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setOpenConfirmPublishModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="action"
              size="lg"
              isLoading={publishDraftMutation.isPending}
              onClick={async () => {
                await publishDraftMutation.mutateAsync({
                  activityId,
                });
                setOpenConfirmPublishModal(false);
              }}
              withIcon="PUBLISH"
            >
              Publish
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
