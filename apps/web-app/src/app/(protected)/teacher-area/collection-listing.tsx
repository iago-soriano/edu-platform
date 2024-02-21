import {
  getLocaleDateFromISO,
  getLocaleDateTimeFromISO,
} from "@infrastructure";
import { twMerge } from "tailwind-merge";
import { CollectionResponseDTO } from "@edu-platform/common";
import { Badge, Icons, Tooltip } from "@components";

const MainContainer = ({ children }) => (
  <div className="grid grid-rows-3">{children}</div>
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

const commonCardClasses =
  "p-3 m-2 bg-surface1 border-accent/70 border-2 bg-opacity-70 w-full rounded-lg hover:scale-[1.01] transition-all cursor-pointer h-fit";
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
        <div className="grid grid-cols-7">
          <div className="w-fit col-span-1">
            <Tooltip
              content={
                collection.notifyOwnerOnStudentOutput
                  ? "Notificações de respostas ativada"
                  : "Notificações de respostas desativada"
              }
            >
              <span>
                <Badge classes="flex items-center cursor-auto">
                  {collection.notifyOwnerOnStudentOutput ? (
                    <Icons.NOTIFICATION size={20} />
                  ) : (
                    <Icons.NOTIFICATIONSLASH size={20} />
                  )}
                </Badge>
              </span>
            </Tooltip>
          </div>
          <div className="w-fit col-span-1">
            <Tooltip
              content={
                collection.isPrivate ? "Coleção privada" : "Coleção pública"
              }
            >
              <span>
                <Badge classes="flex items-center cursor-auto">
                  {collection.isPrivate ? (
                    <Icons.CANT_SEE size={20} />
                  ) : (
                    <Icons.CAN_SEE size={20} />
                  )}
                </Badge>
              </span>
            </Tooltip>
          </div>
        </div>
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
