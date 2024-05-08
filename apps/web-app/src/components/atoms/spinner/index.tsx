import { twMerge } from "tailwind-merge";
import { Icons } from "../icons";

export const Spinner = ({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLDivElement>) => (
  <Icons.SPINNER className={twMerge("animate-spin", className)} />
);
