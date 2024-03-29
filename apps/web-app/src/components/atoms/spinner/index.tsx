import { twMerge } from "tailwind-merge";
import { Icons } from "../icons";

export const Spinner = ({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLDivElement>) => (
  <Icons.SPINNER className={twMerge("w-full h-full animate-spin", className)} />
);
