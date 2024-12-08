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
  //if (typeof window === "undefined") return;
  //   return (
  //     <Link
  //       href={href}
  //       className={cx(
  //         "border-transparent hover:border-primary-foreground text-primary-foreground hover:text-primary-foreground",
  //         "border-b-2 font-medium whitespace-nowrap leading-[64px] h-16 transition block"
  //       )}
  //     >
  //       {children}
  //     </Link>
  //   );

  const refreshCurrentPath = useSearchParams();

  const isClient = typeof window !== "undefined";

  const isAnchorLink = isClient && window?.location.hash.at(0) === "#";

  /*   const [path, setPath] = useState(
    isAnchorLink
      ? decodeURIComponent(window?.location.hash)
      : window?.location.pathname
  ); */

  const [path, setPath] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isClient) {
      const currentPath = isAnchorLink
        ? decodeURIComponent(window.location.hash)
        : window.location.pathname;
      setPath(currentPath);
    }
  }, [refreshCurrentPath, isAnchorLink]);

  const isActive = useMemo(
    () =>
      isAnchorLink ? path?.split("#")[1] === href.split("#")[1] : path === href,
    [path, href, isAnchorLink]
  );

  /*   useEffect(() => {
    setPath(
      isAnchorLink
        ? decodeURIComponent(window?.location.hash)
        : window?.location.pathname
    );
  }, [refreshCurrentPath, isAnchorLink]); */

  // console.log({ isAnchorLink, path, isActive, href });
  return (
    <Link
      href={href}
      className={cx(
        isActive
          ? "border-primary hover:border-primary text-primary"
          : "border-transparent hover:border-primary-foreground text-primary-foreground hover:text-primary-foreground",
        "border-b-2 font-medium whitespace-nowrap leading-[64px] h-16 transition block"
      )}
    >
      {children}
    </Link>
  );
}
