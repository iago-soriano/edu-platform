"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface TabLinksProps {
  tabs: {
    title: string;
    activeRoute: string;
    href?: string;
  }[];
  className?: string;
}
export const TabLinks = ({ tabs, className }: TabLinksProps) => {
  const pathName = usePathname();

  return (
    <div
      className={twMerge(
        "grid h-10 rounded-md bg-muted my-5 p-1 text-muted-foreground",
        className
      )}
    >
      {tabs.map(({ title, href, activeRoute }, i) => (
        <Link
          key={i}
          data-state={pathName.startsWith(activeRoute) && "active"}
          className="
            inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:pointer-events-none disabled:opacity-50 
            data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm
          "
          href={href || activeRoute}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn";

export { Tabs, TabsContent, TabsList, TabsTrigger };
