import { twMerge } from "tailwind-merge";
import { ActivityVersionDto } from "@edu-platform/common";
import { Badge, Icons, Tooltip } from "@components";
import { Title, Description, Date } from "./common";
import { Link } from "@components";
import { MainContainer } from "../collection-cards/common";

export const PublishedVersionActivityCard = ({
  version: { description, title, version, topics },
  /*  onClick, */
  archivedCount,
  hasDraft,
  /*  onClickCreateDraft,
  onClickSeeDraft, */
  collection,
  href,
}: {
  version: ActivityVersionDto;
  hasDraft: boolean;
  archivedCount: number;
  /*   onClick: () => any;
  onClickCreateDraft: () => any;
  onClickSeeDraft: () => any; */
  collection: string;
  href: string;
}) => {
  return (
    /*     <></> */
    <Link
      href={href}
      className={
        "p-3 m-2 md:w-[80%] w-[95%] rounded-lg hover:scale-[1.01] transition-all cursor-pointer h-fit bg-accent bg-opacity-70"
      }
    >
      <MainContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </MainContainer>
      <div className="grid sm:col-span-1 col-span-2 justify-items-center">
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
                /*onClick={(e) => {
                    onClickSeeDraft(); 
                  e.stopPropagation();
                }}*/
                className="bg-surface4 flex justify-center rounded p-2 w-full mb-1"
              >
                <Icons.PENCIL_LINE size={20} />
              </button>
            ) : (
              <button
                /*   onClick={(e) => {
                  onClickCreateDraft();
                  e.stopPropagation();
                }} */
                className="flex w-full items-center justify-center rounded p-2 hover:opacity-50 border border-text2 mb-1"
              >
                <Icons.PENCIL size={20} />
              </button>
            )}
          </Tooltip>
          <Tooltip
            content={
              archivedCount
                ? `Há ${archivedCount} versões arquivadas desta atividade`
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
      {/* <BottomRow topics={topics} version={version} collection={collection} /> */}
    </Link>
  );
};
