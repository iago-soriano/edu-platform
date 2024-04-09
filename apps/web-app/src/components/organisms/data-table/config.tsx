import { Router, getLocaleDateTimeFromISO } from "@infrastructure";
import { ButtonLink } from "@components";
import Link from "next/link";

export const CenteredCell = (info) => (
  <p className="text-center">{info.getValue()}</p>
);

export const CenteredCellWithLink = ({ value, href }) => (
  <div className="flex justify-center">
    <ButtonLink href={href}>{value}</ButtonLink>
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
