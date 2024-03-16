import { twMerge } from "tailwind-merge";
import { CircleNotch } from "@phosphor-icons/react";

export const Spinner = ({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLDivElement>) => (
  <CircleNotch className="h-5 w-5 animate-spin" />
  // <div
  //   {...rest}
  //   className={twMerge(
  //     "flex justify-center after:border-text2 after:border-4 after:border-t-transparent after:aspect-square after:h-full after:box-border after:rounded-full after:block after:animate-spin",
  //     className
  //   )}
  // />
);
