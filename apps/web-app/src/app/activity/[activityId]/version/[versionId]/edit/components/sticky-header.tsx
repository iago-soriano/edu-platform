import { twMerge } from "tailwind-merge";
import { SavingIndicator } from "@components";

export const StickyHeader = ({ show, title, description, saveState }) => {
  return (
    <div
      className={twMerge(
        "bg-surface3 p-2 flex-row justify-between flex sticky top-0 transition-all max-h-12",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <h5 className="w-[40%]">{title}</h5>
      <div className="mx-2 flex items-center overflow-hidden">
        <p className="text-ellipsis">{description}</p>
      </div>
      <SavingIndicator
        hasChanges={saveState === "hasChanges"}
        isLoading={saveState === "isLoading"}
      />
    </div>
  );
};
