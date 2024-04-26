import { IUseCase } from "@edu-platform/common/platform";
import { UserSelectDTO, ICollectionsRepository } from "../../interfaces";
import { SilentInvalidStateError } from "@edu-platform/common";

type InputParams = {
  user: UserSelectDTO;
  collectionDto: {
    id: number;
    name?: string;
    description?: string;
    isPrivate?: boolean;
    notifyOwnerOnStudentOutput?: boolean;
  };
};

type Return = void;

export type IUpdateCollectionMetadataUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateCollectionMetadataUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user, collectionDto }: InputParams) {
    const existingCollection = await this.collectionsRepository.findById(
      collectionDto.id
    );
    if (!existingCollection)
      throw new SilentInvalidStateError(
        `Collection with id ${collectionDto.id} not found`
      );

    existingCollection.updateMetadata(user, collectionDto);

    await this.collectionsRepository.save(existingCollection);
  }
}
export default UseCase;
