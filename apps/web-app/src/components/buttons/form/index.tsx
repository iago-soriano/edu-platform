import { Spinner } from "@components";

interface IFormButtonProps {
  loading?: boolean;
  onClick?: any;
  label: string;
  variant?: string;
  disabled?: boolean;
}
export const FormButton = ({
  loading,
  label,
  disabled,
  ...rest
}: IFormButtonProps) => {
  return (
    <button
      className="bg-accent text-text1 w-full min-w-[100px] block rounded p-4 cursor-pointer border-none hover:enabled:not(:active):bg-surface1 disabled:cursor-none disabled:bg-gray-400"
      type="submit"
      {...rest}
      disabled={loading || disabled}
    >
      {loading ? <Spinner /> : <>{label}</>}
    </button>
  );
};
