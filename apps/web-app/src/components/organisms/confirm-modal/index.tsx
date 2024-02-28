import { Modal, ConfirmButton, CancelButton } from "@components";

interface ConfirmModalProps {
  onClose: () => any;
  confirmAction: (args: any) => any;
  title?: string;
  children: React.ReactNode;
  confirmButton: {
    Icon: React.ComponentType<any>;
    text: string;
  };
}
export const ConfirmModal = ({
  onClose,
  confirmAction,
  title,
  children,
  confirmButton: { Icon, text },
}: ConfirmModalProps) => {
  return (
    <Modal
      modalKey="confirm-publish"
      onClose={onClose}
      className="max-w-[550px] w-[90%] p-4"
    >
      <h5>{title}</h5>
      {children}
      <div className="p-2 my-3 flex justify-around w-full">
        <CancelButton
          onClick={() => {
            onClose();
          }}
        />
        <ConfirmButton onClick={confirmAction} Icon={Icon} text={text} />
      </div>
    </Modal>
  );
};
