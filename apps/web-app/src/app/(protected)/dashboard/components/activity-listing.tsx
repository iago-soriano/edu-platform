import {
  getLocaleDateFromISO,
  getLocaleDateTimeFromISO,
} from "@infrastructure";
import { twMerge } from "tailwind-merge";
import { VersionDTO } from "@edu-platform/common";
import { Badge, Icons, Tooltip } from "@components";
import { Topic } from "../../../activity/[activityId]/version/[versionId]/common-components";

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

const MainContainer = ({ children }) => (
  <div className="grid grid-rows-2 col-span-9 gap-y-1">{children}</div>
);

const Title = ({ children }) => <h5 className="truncate">{children}</h5>;
const EmptyTitle = () => <h6 className="text-text2">Sem título</h6>;

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

export const ArchivedGroupActivityCard = ({
  currentTitle,
  versions,
}: {
  currentTitle: string;
  versions: VersionDTO[];
}) => {
  return (
    <OutlinedContainer legend={currentTitle}>
      {versions.map((dto) => (
        <div>{JSON.stringify(dto)}</div>
      ))}
    </OutlinedContainer>
  );
};

const basicCardClasses =
  "grid grid-cols-10 p-3 m-2 w-full rounded-lg hover:scale-[1.01] transition-all cursor-pointer h-fit";
export const PublishedVersionActivityCard = ({
  version: { title, description, topics },
  onClick,
  archivedCount,
  hasDraft,
  onClickCreateDraft,
  onClickSeeDraft,
}: {
  version: VersionDTO;
  hasDraft: boolean;
  archivedCount: number;
  onClick: (args: any) => any;
  onClickCreateDraft: (args: any) => any;
  onClickSeeDraft: (args: any) => any;
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(basicCardClasses, "bg-accent bg-opacity-70 ")}
    >
      <MainContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </MainContainer>
      <div className="grid col-span-1 justify-items-center">
        <div className="min-w-[60%] mx-auto">
          <Tooltip
            content={
              hasDraft
                ? "Há um rascunho em progresso. Clique para continuar a edição"
                : "Editar atividade"
            }
          >
            {hasDraft ? (
              <button
                onClick={onClickSeeDraft}
                className="bg-surface4 flex justify-center rounded p-2 w-full mb-1"
              >
                <Icons.PENCIL_LINE size={20} />
              </button>
            ) : (
              <button
                onClick={onClickCreateDraft}
                className="flex w-full items-center justify-center rounded p-2 hover:opacity-50 border border-text2 mb-1"
              >
                <Icons.PENCIL size={20} />
              </button>
            )}
          </Tooltip>
          <Tooltip
            content={
              archivedCount
                ? `Há ${archivedCount} versões arquivadas desta atividade.`
                : "Não há versões arquivadas desta atividade"
            }
          >
            <span>
              <Badge classes="text-white bg-gray-600 flex items-center cursor-auto">
                <Icons.FOLDER size={20} />
                <span className="px-1">{archivedCount || "0"}</span>
              </Badge>
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="flex">
        {!!topics.length &&
          topics.split(",").map((topic) => (
            <span>
              <Topic>{topic}</Topic>
            </span>
          ))}
      </div>
    </div>
  );
};

export const DraftVersionActivityCard = ({
  version: { title, description, updatedAt, topics },
  onClick,
}: {
  version: VersionDTO;
  onClick: (args: any) => any;
}) => {
  return (
    <div onClick={onClick} className={twMerge(basicCardClasses, "bg-surface4")}>
      <MainContainer>
        {title ? <Title>{title}</Title> : <EmptyTitle />}
        {description ? (
          <Description>{description}</Description>
        ) : (
          <EmptyDescription />
        )}
        <div className="flex">
          {!!topics.length &&
            topics.split(",").map((topic, i) => (
              <span key={i}>
                <Topic>{topic}</Topic>
              </span>
            ))}
        </div>
      </MainContainer>
      <div className="grid col-span-1 justify-items-end items-center">
        <Date date={updatedAt} />
      </div>
    </div>
  );
};
