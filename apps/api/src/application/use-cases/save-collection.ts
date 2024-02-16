import { Collection } from "@domain";
import {
  UserIsNotCollectionOwner,
  UserIsNotTeacher,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, ICollectionsRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collection: Collection;
};

type Return = {
  collectionId: number;
};

export type ISaveCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveCollectionUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user, collection }: InputParams) {
    if (collection.id !== undefined) {
      const existingCollection = await this.collectionsRepository.getById(
        collection.id
      );

      if (existingCollection.owner.id !== user.id)
        throw new UserIsNotCollectionOwner();

      await this.collectionsRepository.update(collection.id, collection);
      return { collectionId: collection.id };
    }

    collection.validateName();
    collection.validateDescription();

    return await this.collectionsRepository.insert(collection);
  }
}
export default UseCase;
