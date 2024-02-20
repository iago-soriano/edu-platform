import { CollectionResponseDTO } from "@edu-platform/common";
import { IUseCase, UserSelectDTO, ICollectionsRepository } from "@interfaces";
import { CollectionDtoMapper } from "@dto-mappers";

type InputParams = {
  user: UserSelectDTO;
};

type Return = {
  isOwnerOf: CollectionResponseDTO[] | undefined;
  participatesIn: CollectionResponseDTO[] | undefined;
};

export type IListCollectionsByUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements IListCollectionsByUserUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user }: InputParams) {
    const isOwnerOf = await this.collectionsRepository.listByOwnership(user.id);
    const participatesIn = await this.collectionsRepository.listByParticipation(
      user.id
    );

    return {
      isOwnerOf: isOwnerOf.map((coll) => CollectionDtoMapper.mapToDto(coll)),
      participatesIn: participatesIn.map((coll) =>
        CollectionDtoMapper.mapToDto(coll)
      ),
    };
  }
}
export default UseCase;
