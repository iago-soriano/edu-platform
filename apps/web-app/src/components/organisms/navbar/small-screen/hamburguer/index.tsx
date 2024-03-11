import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const styledDiv = "bg-text1 w-full h-1 rounded-[10px] transition-all duration-[0.3s] ease-linear relative origin-[1px]";

export const HamburguerButton = forwardRef<
  HTMLButtonElement,
  { open: boolean; onClick: () => void }
>(({ open, onClick }, ref) => {
  return (
    <button ref={ref} onClick={onClick} className="flex flex-col justify-evenly w-16 bg-transparent border-none h-[4.7rem] cursor-pointer overflow-x-hidden pt-4 pr-2 pb-2 pl-4 transition-opacity ease-in-out duration-150 hover:opacity-[0.8] focus:opacity-[0.8]">
      <div className={twMerge(styledDiv, open ? "rotate-45" : "rotate-0")}/>
      <div className={twMerge(styledDiv, open ? "opacity-0 translate-x-[20px]" : "opacity-100 translate-x-0")}/>
      <div className={twMerge(styledDiv, open ? "-rotate-45" : "rotate-0 ")}/>
    </button>
  );
});
