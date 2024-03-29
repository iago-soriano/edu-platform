import { Modal, Button, ButtonProps } from "@components";

interface ConfirmModalProps {
  onClose: () => any;
  confirmAction: (args: any) => any;
  title?: string;
  children: React.ReactNode;
  confirmButton: {
    icon: ButtonProps["withIcon"];
    text: string;
  };
}
export const ConfirmModal = ({
  onClose,
  confirmAction,
  title,
  children,
  confirmButton: { icon, text },
}: ConfirmModalProps) => {
  return (
    <Modal
      modalKey="confirm-modal"
      onClose={onClose}
      className="max-w-[550px] w-[90%] p-4"
    >
      <h5>{title}</h5>
      {children}
      <div className="p-2 my-3 mx-auto flex justify-evenly w-full">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button size="lg" onClick={confirmAction} withIcon={icon}>
          {text}
        </Button>
      </div>
    </Modal>
  );
};
