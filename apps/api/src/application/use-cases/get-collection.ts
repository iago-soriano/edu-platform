import { Collection } from "@domain";
import { IUseCase, UserSelectDTO, ICollectionsRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
};
type Return = Collection;

export type IGetCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetCollectionUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user, collectionId }: InputParams) {
    const collection = await this.collectionsRepository.getById(collectionId);

    if (collection.owner.id !== user.id)
      throw new Error("Collection not found");

    return collection;
  }
}

export default UseCase;
