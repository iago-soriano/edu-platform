import { Icons } from "../icons";

export const NewItemButton = ({ children, ...rest }) => (
  <button
    {...rest}
    className="p-4 flex items-center hover:bg-surface1 hover:bg-opacity-70 w-full rounded-lg"
  >
    <Icons.PLUS size={20} className="text-accent" />
    <span className="inline-block mx-2">{children}</span>
  </button>
);
