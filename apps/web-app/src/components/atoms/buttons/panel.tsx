import { twMerge } from "tailwind-merge";

export const PanelButton = ({ children, selected, ...rest }) => (
  <button
    {...rest}
    className={twMerge(
      "border my-2 p-4 flex items-center hover:bg-surface1 hover:bg-opacity-70 w-full rounded-lg",
      selected ? "bg-surface1" : "bg-transparent"
    )}
  >
    <span className="inline-block mx-2">{children}</span>
  </button>
);
