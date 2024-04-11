import { Spinner, Icons, Tooltip } from "@components";

export const SavingIndicator = ({ saveState }) => {
  const getContent = () => {
    if (saveState === "isLoading") return <Spinner />;
    if (saveState === "hasChanges")
      return (
        <Tooltip content={"There are unsaved changes"}>
          <span>
            <Icons.PENCIL_LINE size={28} />
          </span>
        </Tooltip>
      );
    if (saveState === "ready")
      return (
        <Tooltip content={"All changes have been saved"}>
          <span>
            <Icons.CHECK size={28} />
          </span>
        </Tooltip>
      );
    if (saveState === "error")
      return (
        <Tooltip content={"There are errors"}>
          <span>
            <Icons.X size={28} className="text-error" />
          </span>
        </Tooltip>
      );
  };
  return (
    <div className="h-7 w-10 m-1 text-text2 text-opacity-50 flex justify-end">
      {getContent()}
    </div>
  );
};
