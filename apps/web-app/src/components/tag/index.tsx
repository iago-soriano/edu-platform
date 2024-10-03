import { Icons } from "../icons";

export const Tag = ({
  text,
  onClickDelete,
}: {
  text: string;
  onClickDelete?: () => any;
}) => {
  return (
    <div className="flex rounded-full px-3 py-1 items-center bg-surface3 w-fit h-fit  mx-1">
      {text}
      {onClickDelete && (
        <Icons.X
          className="cursor-pointer ml-1 hover:bg-opacity-70"
          onClick={onClickDelete}
        />
      )}
    </div>
  );
};
