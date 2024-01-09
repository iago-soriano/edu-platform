import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const getTabClassNames = (isSelected) => {
  const selectedClassNames = "bg-opacity-80 bg-surface3";
  return twMerge(
    "p-2 bg-surface2 inline-block hover:bg-surface3 hover:bg-opacity-80 rounded",
    isSelected && selectedClassNames
  );
};

export const ToggleText = ({
  buttons,
}: {
  buttons: { text: string; href: string }[];
}) => {
  const pathName = usePathname();

  return (
    <div className="">
      {buttons.map(({ text, href }) => (
        <Link
          key={`${text}-${href}`}
          className={getTabClassNames(pathName === href)}
          href={href}
        >
          {text}
        </Link>
      ))}
    </div>
  );
};
