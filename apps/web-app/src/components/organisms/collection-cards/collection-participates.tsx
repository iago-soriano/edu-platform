import { MainContainer, Name, Description, EmptyDescription } from "./common";
import { CollectionResponseDTO } from "@edu-platform/common/api";

export const CollectionParticipatesInCard = ({
  onClick,
  collection,
}: {
  collection: CollectionResponseDTO;
  onClick: (args: any) => any;
}) => {
  return (
    <MainContainer onClick={onClick}>
      <Name>{collection.name}</Name>
      <Description>{collection.description}</Description>
    </MainContainer>
  );
};
