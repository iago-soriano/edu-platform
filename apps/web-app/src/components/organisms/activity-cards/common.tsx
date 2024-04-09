import {
  getLocaleDateFromISO,
  getLocaleDateTimeFromISO,
} from "@infrastructure";
import { twMerge } from "tailwind-merge";
import { Tag, Icons, Tooltip, Badge } from "@components";

export const Date = ({ date }) => (
  <div className="flex flex-wrap items-center justify-center text-sm p-1 text-text2">
    <Icons.CLOCK sze={16} />
    <span className="px-1">{getLocaleDateTimeFromISO(date)}</span>
  </div>
);

export const Title = ({ children }) => (
  <h5 className="truncate w-fit">{children}</h5>
);
export const EmptyTitle = () => <h5 className="text-text2">No title</h5>;

const descriptionClasses = "self-center truncate";
export const Description = ({ children }) => (
  <p className={descriptionClasses}>{children}</p>
);
export const EmptyDescription = () => (
  <p className={twMerge(descriptionClasses, "text-text2")}>No description</p>
);
