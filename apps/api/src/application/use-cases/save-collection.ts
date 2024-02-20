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
    if (collection.id) {
      const existingCollection = await this.collectionsRepository.getById(
        collection.id
      );
      if (!existingCollection) throw new Error("Coleção não encontrada");

      if (existingCollection.owner.id !== user.id)
        throw new UserIsNotCollectionOwner();

      existingCollection.merge(collection);

      await this.collectionsRepository.update(
        collection.id,
        existingCollection
      );
      return { collectionId: collection.id };
    }

    collection.validateName();
    collection.validateDescription();

    return await this.collectionsRepository.insert(collection);
  }
}
export default UseCase;
