import { twMerge } from "tailwind-merge";
import { Icons } from "@components";

const footerButtonsClasses =
  "inline-block rounded border-2 border-accent p-2 flex items-center justify-center w-[45%] [&>span]:mx-2";

interface ConfirmButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ComponentType<any>;
  text: string;
}
export const ConfirmButton = ({ onClick, Icon, text }: ConfirmButtonProps) => (
  <button
    onClick={onClick}
    className={twMerge(footerButtonsClasses, "text-white bg-accent")}
  >
    <Icon size={20} /> <span>{text}</span>
  </button>
);
export const CancelButton = (props) => (
  <button {...props} className={twMerge(footerButtonsClasses, "text-accent")}>
    <Icons.X size={25} /> <span>Cancelar</span>
  </button>
);
