import {
  getLocaleDateFromISO,
  getLocaleDateTimeFromISO,
} from "@infrastructure";
import { twMerge } from "tailwind-merge";
import { VersionResponseDTO } from "@edu-platform/common";
import { Badge, Icons, Tooltip } from "@components";
import { Topic } from "../../../app/activity/[activityId]/version/[versionId]/common-components";

export const ArchivedGroupActivityCard = ({
  currentTitle,
  versions,
}: {
  currentTitle: string;
  versions: VersionResponseDTO[];
}) => {
  return (
    <OutlinedContainer legend={currentTitle}>
      {versions.map((dto) => (
        <div>{JSON.stringify(dto)}</div>
      ))}
    </OutlinedContainer>
  );
};

const OutlinedContainer = ({
  children,
  onClick,
  legend,
}: {
  children: any;
  onClick?: (args: any) => any;
  legend: string;
}) => (
  <fieldset
    onClick={onClick}
    className="border-text2 rounded border transition-all hover:scale-[1.01] cursor-pointer"
  >
    <legend className="px-2">{legend}</legend>
    {children}
  </fieldset>
);
