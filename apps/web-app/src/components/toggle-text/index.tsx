import Link from "next/link";
import { twMerge } from "tailwind-merge";

const getTabClassNames = (disabled, isSelected) => {
  if (disabled) return "bg-gray";
  const selectedClassNames = "bg-opacity-80 bg-surface3";
  return twMerge(
    "p-2 bg-surface2 inline-block hover:bg-surface3 hover:bg-opacity-80 rounded",
    isSelected && selectedClassNames
  );
};

export const ToggleText = ({
  buttons,
  className,
}: {
  buttons: {
    text: string;
    href?: string;
    disabled?: boolean;
    isSelected: boolean;
    onClick?: () => any;
  }[];
  className?: string;
}) => {
  return (
    <div className={twMerge("w-full", className)}>
      {buttons.map(({ text, href, disabled, isSelected }) => (
        <Link
          key={`${text}-${href}`}
          className={getTabClassNames(disabled, isSelected)}
          href={href}
          aria-disabled={disabled}
        >
          {text}
        </Link>
      ))}
    </div>
  );
};
