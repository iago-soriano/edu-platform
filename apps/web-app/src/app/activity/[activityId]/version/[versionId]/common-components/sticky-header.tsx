import { twMerge } from "tailwind-merge";
import { SavingIndicator, Icons } from "@components";

export const StickyHeader = ({
  show,
  title,
  description,
  saveState,
  onOpenOptionsMenu,
}) => {
  return (
    <div
      className={twMerge(
        "bg-surface3 p-2 flex-row justify-between flex sticky top-0 transition-all max-h-12",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="min-w-[90%] flex">
        <h5 className="xl:w-[50%] w-[100%] overflow-hidden">{title}</h5>
        <div className="mx-2 xl:flex items-center overflow-hidden hidden">
          <p className="text-ellipsis">{description}</p>
        </div>
      </div>
      <div className="flex">
        <SavingIndicator
          hasChanges={saveState === "hasChanges"}
          isLoading={saveState === "isLoading"}
        />
        <Icons.LIST
          onClick={onOpenOptionsMenu}
          className="cursor-pointer mx-3 p-1 text-accent"
          size={33}
        />
      </div>
    </div>
  );
};
