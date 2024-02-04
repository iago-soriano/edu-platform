import { Collection } from "@domain";
import {
  UserIsNotCollectionOwner,
  UserIsNotTeacher,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, ICollections } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collection: Collection;
};

type Return = {
  collectionId: number;
};

export type ISaveCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveCollectionUseCase {
  constructor(private collections: ICollections) {}

  async execute({ user, collection }: InputParams) {
    if (user.type !== "Teacher") throw new UserIsNotTeacher();

    if (collection.id !== undefined) {
      const existingCollection = await this.collections.getById(collection.id);

      if (existingCollection.ownerId !== user.id)
        throw new UserIsNotCollectionOwner();

      await this.collections.update(collection.id, collection);
      return { collectionId: collection.id };
    }

    return await this.collections.insert(collection);
  }
}
export default UseCase;
