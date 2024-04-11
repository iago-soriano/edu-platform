import { Icons } from "../icons";
import { twMerge } from "tailwind-merge";

const footerButtonsClasses =
  "inline-block rounded border-2 border-accent p-2 flex items-center justify-center w-[35%] [&>span]:mx-2";
export const RemoveButton = (props) => (
  <button {...props} className={twMerge(footerButtonsClasses, "text-accent")}>
    <Icons.TRASH size={20} /> <span>Remover</span>
  </button>
);
