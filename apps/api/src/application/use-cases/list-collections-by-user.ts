import { CollectionDTO } from "@edu-platform/common";
import { IUseCase, UserSelectDTO, ICollectionsRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
};

type Return = {
  isOwnerOf: CollectionDTO[] | undefined;
  participatesIn: CollectionDTO[] | undefined;
};

export type IListCollectionsByUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements IListCollectionsByUserUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user }: InputParams) {
    const isOwnerOf = await this.collectionsRepository.listByOwnership(user.id);
    const participatesIn = await this.collectionsRepository.listByParticipation(
      user.id
    );

    return { isOwnerOf, participatesIn };
  }
}
export default UseCase;
