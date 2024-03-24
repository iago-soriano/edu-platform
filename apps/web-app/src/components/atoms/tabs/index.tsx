"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const TabsLink = ({ tabs }) => {
  const pathName = usePathname();

  return (
    <div
      className={twMerge(
        "grid w-full m-0 lg:w-[60%] lg:mr-auto h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        `grid-cols-${tabs.length}`
      )}
    >
      {tabs.map(({ title, route }, i) => (
        <Link
          key={i}
          data-state={pathName === route && "active"}
          className="
            inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:pointer-events-none disabled:opacity-50 
            data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm
          "
          href={route}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shadcn";

export { Tabs, TabsContent, TabsList, TabsTrigger };
