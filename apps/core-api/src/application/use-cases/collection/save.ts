import { IUseCase } from "@edu-platform/common/platform";
import { CollectionFactory } from "@domain/entities";
import { CollectionRequestDTO } from "@edu-platform/common";
import { UserSelectDTO, ICollectionsRepository } from "@application/interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionDto: CollectionRequestDTO;
};

type Return = { CollectionId: number };

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

      //existingCollection.updateMetadata(user, collectionDto);
    }

    const newCollection = CollectionFactory.fromRequestDto(collectionDto, user);

    // newCollection.validateMetadata();

    return (await this.collectionsRepository.save(newCollection))[0];
  }
}
export default UseCase;
