import {
  getLocaleDateFromISO,
  getLocaleDateTimeFromISO,
} from "@infrastructure";
import { twMerge } from "tailwind-merge";
import { VersionResponseDTO } from "@edu-platform/common";
import { Badge, Icons, Tooltip } from "@components";
import { Topic } from "../../../app/activity/[activityId]/version/[versionId]/common-components";

export const commonCardClasses =
  "grid grid-cols-10 p-3 m-2 w-full rounded-lg hover:scale-[1.01] transition-all cursor-pointer h-fit";

export const TopicsCollectionRow = ({ topics, collection }) => {
  return (
    <div className="flex justify-between col-span-10">
      <div className="col-span-9 flex justify-start">
        {!!topics.length &&
          topics.split(",").map((topic, i) => (
            <span key={i}>
              <Topic>{topic}</Topic>
            </span>
          ))}
      </div>
      <span>{collection}</span>
    </div>
  );
};

export const Date = ({ date }) => (
  <Tooltip content={`Última atualização em ${getLocaleDateTimeFromISO(date)}`}>
    <div className="flex flex-wrap items-center justify-center text-sm p-1">
      <Icons.CLOCK sze={16} />
      <span className="px-1">{getLocaleDateFromISO(date)}</span>
    </div>
  </Tooltip>
);

export const MainContainer = ({ children }) => (
  <div className="grid grid-rows-2 sm:col-span-9 col-span-8 gap-y-1">
    {children}
  </div>
);

export const Title = ({ children }) => <h5 className="truncate">{children}</h5>;
export const EmptyTitle = () => <h6 className="text-text2">Sem título</h6>;

const descriptionClasses = "row-start-2 self-center truncate";
export const Description = ({ children }) => (
  <p className={descriptionClasses}>{children}</p>
);
export const EmptyDescription = () => (
  <p className={twMerge(descriptionClasses, "text-text2")}>Sem descrição</p>
);
