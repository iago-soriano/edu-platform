import { Modal, Icons } from "@components";
import { twMerge } from "tailwind-merge";

const footerButtonsClasses =
  "inline-block rounded border-2 border-accent p-2 flex items-center justify-center w-[45%] [&>span]:mx-2";
const RemoveButton = (props) => (
  <button {...props} className={twMerge(footerButtonsClasses, props.className)}>
    <Icons.TRASH size={20} /> <span>Remover</span>
  </button>
);
const CancelButton = (props) => (
  <button {...props} className={twMerge(footerButtonsClasses, props.className)}>
    <Icons.X size={25} /> <span>Cancelar</span>
  </button>
);

export const ConfirmDeleteModal = ({ onClose, deleteMutation }) => {
  return (
    <Modal
      modalKey="confirm-delete"
      onClose={onClose}
      className="max-w-[550px] w-[90%] p-4"
    >
      <h5>Ao remover este rascunho, todas as alterações serão perdidas</h5>
      <br />
      <p>Deseja remover o rascunho mesmo assim?</p>
      <br />
      <div className="p-2 my-3 flex justify-around w-full">
        <RemoveButton className="text-accent" onClick={deleteMutation} />
        <CancelButton
          className="bg-accent text-white"
          onClick={() => {
            onClose();
          }}
        />
      </div>
    </Modal>
  );
};
