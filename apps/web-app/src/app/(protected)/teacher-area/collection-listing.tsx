import {
  getLocaleDateFromISO,
  getLocaleDateTimeFromISO,
} from "@infrastructure";
import { twMerge } from "tailwind-merge";
import { CollectionResponseDTO } from "@edu-platform/common";
import { Badge, Icons, Tooltip } from "@components";

const MainContainer = ({ children }) => (
  <div className="grid grid-rows-3 col-span-9 gap-y-1">{children}</div>
);

const Name = ({ children }) => <h5 className="truncate">{children}</h5>;
const EmptyName = () => <h6 className="text-text2">Sem título</h6>;

const descriptionClasses = "row-start-2 self-center truncate";
const Description = ({ children }) => (
  <p className={descriptionClasses}>{children}</p>
);
const EmptyDescription = () => (
  <p className={twMerge(descriptionClasses, "text-text2")}>Sem descrição</p>
);

const Date = ({ date }) => (
  <Tooltip content={`Última atualização em ${getLocaleDateTimeFromISO(date)}`}>
    <div className="flex flex-wrap items-center justify-center text-sm p-1">
      <Icons.CLOCK sze={16} />
      <span className="px-1">{getLocaleDateFromISO(date)}</span>
    </div>
  </Tooltip>
);

const commonCardClasses =
  "grid grid-cols-10 p-3 m-2 bg-surface1 border-accent/70 border-2 bg-opacity-70 w-full rounded-lg hover:scale-[1.01] transition-all cursor-pointer h-fit";
export const CollectionOwnsCard = ({
  onClick,
  collection,
}: {
  collection: CollectionResponseDTO;
  onClick: (args: any) => any;
}) => {
  return (
    <div onClick={onClick} className={twMerge(commonCardClasses, "")}>
      <MainContainer>
        <Name>{collection.name}</Name>
        {collection.description ? (
          <Description>{collection.description}</Description>
        ) : (
          <EmptyDescription />
        )}
      </MainContainer>
    </div>
  );
};

export const CollectionParticipatesInCard = ({
  onClick,
  collection,
}: {
  collection: CollectionResponseDTO;
  onClick: (args: any) => any;
}) => {
  return (
    <div onClick={onClick} className={twMerge(commonCardClasses, "")}>
      <MainContainer>
        <Name>{collection.name}</Name>
        <Description>{collection.description}</Description>
      </MainContainer>
    </div>
  );
};
