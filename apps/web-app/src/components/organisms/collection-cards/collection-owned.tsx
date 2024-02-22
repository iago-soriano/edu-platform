import { CollectionResponseDTO } from "@edu-platform/common";
import { Badge, Icons, Tooltip } from "@components";
import { MainContainer, Name, Description, EmptyDescription } from "./common";

export const CollectionOwnsCard = ({
  onClick,
  collection,
}: {
  collection: CollectionResponseDTO;
  onClick: (args: any) => any;
}) => {
  return (
    <MainContainer onClick={onClick}>
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
  );
};
