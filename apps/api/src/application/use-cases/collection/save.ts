import { CollectionFactory } from "@domain";
import {
  UserIsNotCollectionOwner,
  CollectionRequestDTO,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, ICollectionsRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionDto: CollectionRequestDTO;
};

type Return = void;

export type ISaveCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveCollectionUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user, collectionDto }: InputParams) {
    if (collectionDto.id) {
      const existingCollection = await this.collectionsRepository.findRootById(
        collectionDto.id
      );
      if (!existingCollection)
        throw new Error(`Collection with id ${collectionDto.id} not found`);

      existingCollection.upsert(user, collectionDto);
      // return this.collectionsRepository.save(existingCollection);
    }

    const newCollection = CollectionFactory.fromRequestDto(collectionDto, user);

    await this.collectionsRepository.save(newCollection);

    // if (collection.id) {
    //   const existingCollection = await this.collectionsRepository.getById(
    //     collection.id
    //   );
    //   if (!existingCollection) throw new Error("Coleção não encontrada");
    //   if (existingCollection.owner.id !== user.id)
    //     throw new UserIsNotCollectionOwner();
    //   existingCollection.merge(collection);
    //   await this.collectionsRepository.update(existingCollection);
    //   return { collectionId: collection.id };
    // }
    // collection.validateName();
    // collection.validateDescription();
    // return await this.collectionsRepository.insert(collection);
  }
}
export default UseCase;
