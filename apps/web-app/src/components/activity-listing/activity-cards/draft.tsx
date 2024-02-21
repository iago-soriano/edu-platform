import {
  getLocaleDateFromISO,
  getLocaleDateTimeFromISO,
} from "@infrastructure";
import { twMerge } from "tailwind-merge";
import { VersionResponseDTO } from "@edu-platform/common";
import { Badge, Icons, Tooltip } from "@components";
import {
  MainContainer,
  Title,
  EmptyTitle,
  Description,
  EmptyDescription,
  Date,
  commonCardClasses,
  TopicsCollectionRow,
} from "./common";

export const DraftVersionActivityCard = ({
  version: { title, description, updatedAt, topics },
  onClick,
  collection,
}: {
  version: VersionResponseDTO;
  onClick: (args: any) => any;
  collection: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(commonCardClasses, "bg-surface4")}
    >
      <MainContainer>
        {title ? <Title>{title}</Title> : <EmptyTitle />}
        {description ? (
          <Description>{description}</Description>
        ) : (
          <EmptyDescription />
        )}
      </MainContainer>
      <div className="grid col-span-1 justify-items-end items-center">
        <Date date={updatedAt} />
      </div>
      <TopicsCollectionRow topics={topics} collection={collection} />
    </div>
  );
};
