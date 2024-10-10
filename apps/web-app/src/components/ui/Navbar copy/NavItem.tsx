"use client";

import { cx } from "@styles/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavItemProps = {
  href: string;
  children: ReactNode;
};

export function NavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const path = `/${href.split("/")[1]}`;

  return (
    <Link
      href={href}
      className={cx(
        pathname.startsWith(path)
          ? "border-green-700 hover:border-green-700 text-green-700 dark:border-green-500 dark:hover:border-green-500 dark:text-green-500"
          : "border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white",
        "border-b-2 font-medium whitespace-nowrap leading-[64px] h-16 transition"
      )}
    >
      {children}
    </Link>
  );
}
