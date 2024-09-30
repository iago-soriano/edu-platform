"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

const linkClasses =
  "inline-flex items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground px-4 py-4 justify-start";

export const SideNav = ({ tabs }) => {
  const path = usePathname();
  const getLinkClasses = (href: string) =>
    twMerge(
      linkClasses,
      path.split("/").pop() === href
        ? "bg-muted hover:bg-muted"
        : "hover:bg-transparent hover:underline"
    );

  return (
    <nav className="flex flex-col justify-start">
      {tabs.map(({ title, href }, i) => (
        <Link className={getLinkClasses(href)} href={href} key={i}>
          {title}
        </Link>
      ))}
    </nav>
  );
};
