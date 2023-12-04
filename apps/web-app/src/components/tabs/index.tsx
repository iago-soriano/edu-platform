import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

const getTabClassNames = (isSelected) => {
  const selectedClassNames = "font-bold text-accent shadow-outline";
  return twMerge(
    "p-4 bg-surface2 inline-block hover:bg-surface3 hover: bg-opacity-80 rounded",
    isSelected && selectedClassNames
  );
};

export const Tabs = ({ children }) => <div className="">{children}</div>;
const TabItem = ({ children, href, ...props }) => {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={getTabClassNames(pathName.endsWith(href))}
      {...props}
    >
      {children}
    </Link>
  );
};

Tabs.Item = TabItem;
