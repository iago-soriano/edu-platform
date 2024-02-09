import { CollectionDTO } from "@edu-platform/common";
import { IUseCase, UserSelectDTO, ICollections } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
};

type Return = {
  isOwnerOf: CollectionDTO[] | undefined;
  participatesIn: CollectionDTO[] | undefined;
};

export type IListCollectionsByUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements IListCollectionsByUserUseCase {
  constructor(private collections: ICollections) {}

  async execute({ user }: InputParams) {
    const isOwnerOf = await this.collections.listByOwnership(user.id);
    const participatesIn = await this.collections.listByParticipation(user.id);

    return { isOwnerOf, participatesIn };
  }
}
export default UseCase;
