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
  BottomRow,
} from "./common";

export const DraftVersionActivityCard = ({
  version: { title, description, updatedAt, topics, version },
  onClick,
  collection,
}: {
  version: Partial<VersionResponseDTO>;
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
      <BottomRow version={version} topics={topics} collection={collection} />
    </div>
  );
};
