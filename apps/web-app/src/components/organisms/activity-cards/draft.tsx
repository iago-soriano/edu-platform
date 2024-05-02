import { twMerge } from "tailwind-merge";
import { ListActivitiesForOwnerResponseBody } from "@edu-platform/common/api";
import { Badge, Icons, Tooltip, Tag } from "@components";
import {
  Title,
  EmptyTitle,
  Description,
  EmptyDescription,
  Date,
} from "./common";

export const DraftVersionActivityCard = ({
  version,
  onClick,
  collection,
}: {
  version: ListActivitiesForOwnerResponseBody["data"][number]["draft"];
  onClick: (args: any) => any;
  collection: string;
}) => {
  if (!version) return <></>;
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "p-3 m-2 md:w-[80%] w-[95%] rounded-lg hover:scale-[1.01] transition-all cursor-pointer h-fit bg-surface4"
      )}
    >
      <div className="flex flex-row justify-between">
        {version.title ? <Title>{version.title}</Title> : <EmptyTitle />}
        <Badge classes="border border-text2 text-text2 flex items-center cursor-auto w-fit">
          Draft
        </Badge>
      </div>
      <div className="flex justify-between">
        {version.description ? (
          <Description>{version.description}</Description>
        ) : (
          <EmptyDescription />
        )}
        <div className="flex my-4">
          <Tooltip content="Activity version">
            <div className="flex text-text2 mx-4">
              <Icons.VERSION size={20} /> {version.version}
            </div>
          </Tooltip>
          <Date date={version.updatedAt} />
        </div>
      </div>
      <div className="col-span-9 flex justify-start">
        {!!version.topics?.length &&
          version.topics?.split(",").map((topic, i) => (
            <span key={i}>
              <Tag text={topic} />
            </span>
          ))}
      </div>
    </div>
  );
};
