import { Router, getLocaleDateTimeFromISO } from "@infrastructure";
import Link from "next/link";

export const CenteredCell = (info) => (
  <p className="text-center">{info.getValue()}</p>
);

export const CenteredCellWithLink = ({ value, href }) => (
  <div className="flex justify-center">
    <Link href={href}>{value}</Link>
  </div>
);

export const LeftHeader = ({ name }) => <p className="text-left">{name}</p>;
export const CenteredDateCell = (info) => (
  <p className="flex flex-row justify-center">
    {getLocaleDateTimeFromISO(info.getValue().toString())}
  </p>
);
export const cellSizes = {
  sm: 90,
  md: 200,
};

export const EmptyGridWarning = ({ message }: { message?: string }) => {
  return (
    <div className="w-full h-full flex-row justify-center items-center">
      <h6>{message || "No items to show"}</h6>
    </div>
  );
};
