import { Modal, Icons } from "@components";
import { twMerge } from "tailwind-merge";

const footerButtonsClasses =
  "inline-block rounded border-2 border-accent p-2 flex items-center justify-center w-[45%] [&>span]:mx-2";
const PublishButton = (props) => (
  <button {...props} className={twMerge(footerButtonsClasses, props.className)}>
    <Icons.PUBLISH size={20} /> <span>Publicar</span>
  </button>
);
const CancelButton = (props) => (
  <button {...props} className={twMerge(footerButtonsClasses, props.className)}>
    <Icons.X size={25} /> <span>Cancelar</span>
  </button>
);

export const ConfirmPublishModal = ({ onClose, publishMutation }) => {
  return (
    <Modal
      modalKey="confirm-publish"
      onClose={onClose}
      className="max-w-[550px] w-[90%] p-4"
    >
      <h5>Publicar rascunho</h5>
      <br />
      <p>Deseja publicar o rascunho?</p>
      <br />
      <div className="p-2 my-3 flex justify-around w-full">
        <CancelButton
          className="text-accent"
          onClick={() => {
            onClose();
          }}
        />
        <PublishButton
          className="text-white bg-accent"
          onClick={publishMutation}
        />
      </div>
    </Modal>
  );
};
