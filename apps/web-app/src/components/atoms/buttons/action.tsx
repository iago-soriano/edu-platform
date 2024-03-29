import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const ActionLink = ({ children, highlighted, className, href }) => {
  const highlightedStyles = highlighted ? "font-bold" : "";
  return (
    <Link
      className={twMerge(
        "cursor-pointer my-auto mx-0 p-2 rounded-md transition-opacity hover:opacity-80 focus-visible:opacity-80 bg-accent text-white",
        highlightedStyles,
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

import { Spinner } from "../spinner";

interface IFormButtonProps {
  loading?: boolean;
  onClick?: any;
  label: string;
  className?: string;
  disabled?: boolean;
}
export const FormButton = ({
  loading,
  label,
  disabled,
  className,
  ...rest
}: IFormButtonProps) => {
  const disabledStyles = disabled
    ? "cursor-not-allowed bg-gray-400 text-gray-900 opacity-60"
    : "";
  return (
    <button
      className={twMerge(
        "h-12 block w-full min-w-[100px] cursor-pointer my-auto mx-0 p-2 rounded-md transition-opacity hover:opacity-80 focus-visible:opacity-80 bg-accent text-white",
        disabledStyles,
        className
      )}
      type="submit"
      {...rest}
      disabled={loading || disabled}
    >
      {loading ? <Spinner /> : <>{label}</>}
    </button>
  );
};
