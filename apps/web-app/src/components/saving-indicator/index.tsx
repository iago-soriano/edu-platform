import { Spinner, Icons, Tooltip } from "@components";

export const SavingIndicator = ({ isLoading, hasChanges }) => {
  return (
    <div className="h-7 w-10 m-1 text-text2 text-opacity-50 flex justify-end">
      {isLoading ? (
        <Spinner />
      ) : hasChanges ? (
        <Tooltip content={"Há mudanças não salvas"}>
          <span>
            <Icons.PENCIL_LINE size={28} />
          </span>
        </Tooltip>
      ) : (
        <Tooltip content={"Atividade salva"}>
          <span>
            <Icons.CHECK size={28} />
          </span>
        </Tooltip>
      )}
    </div>
  );
};
