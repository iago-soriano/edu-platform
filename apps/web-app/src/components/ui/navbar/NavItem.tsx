"use client";

import { cx } from "@styles/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState, useMemo } from "react";

type NavItemProps = {
  href: string;
  children: ReactNode;
};

export function NavItem({ href, children }: NavItemProps) {
  // const pathname = usePathname();
  // const pathSplit = href.split("#")[0].split("/");
  // const path = `/${pathSplit[pathSplit.length - 1]}`;

  // console.log(pathname, pathSplit, path);
  // Used to trigger the side effect responsible of updating the path state
  const refreshCurrentPath = useSearchParams();

  const isAnchorLink = window.location.hash.at(0) === "#";

  const [path, setPath] = useState(
    isAnchorLink
      ? decodeURIComponent(window.location.hash)
      : window.location.pathname
  );

  const isActive = useMemo(
    () =>
      isAnchorLink ? path.split("#")[1] === href.split("#")[1] : path === href,
    [path, href, isAnchorLink]
  );

  useEffect(() => {
    setPath(
      isAnchorLink
        ? decodeURIComponent(window.location.hash)
        : window.location.pathname
    );
  }, [refreshCurrentPath, isAnchorLink]);

  console.log({ isAnchorLink, path, isActive, href });
  return (
    <Link
      href={href}
      className={cx(
        isActive
          ? "border-accent hover:border-accent text-accent"
          : "border-transparent hover:border-text2 text-text2 hover:text-text2",
        "border-b-2 font-medium whitespace-nowrap leading-[64px] h-16 transition block"
      )}
    >
      {children}
    </Link>
  );
}
