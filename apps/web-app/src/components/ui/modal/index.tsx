import { twMerge } from "tailwind-merge";
import { Icons } from "../icons";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: string;
  onClose: () => any;
  modalKey: string;
}

export const Modal = ({
  modalKey,
  children,
  onClose,
  className,
}: IModalProps) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === `outside-${modalKey}`) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center z-50 bg-opacity-40 bg-black"
      id={`outside-${modalKey}`}
      onMouseDown={handleOutsideClick}
    >
      <div
        className={twMerge(
          "rounded-lg bg-surface2 border-2 border-text1",
          className
        )}
        role="dialog"
      >
        <div className="flex justify-end items-center">
          <Icons.X size={35} className="cursor-pointer p-1" onClick={onClose} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
