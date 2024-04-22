import { IUseCase } from "@edu-platform/common/platform";
import { UserSelectDTO, ICollectionsRepository } from "@application/interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
  participationId: number;
};

type Return = void;

export type IUnfollowCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUnfollowCollectionUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user, collectionId, participationId }: InputParams) {
    const collection =
      await this.collectionsRepository.findByIdWithAParticipation(
        collectionId,
        participationId
      );
    if (!collection) throw new Error("Coleção não encontrada");

    collection.removeFollower(participationId, user);

    await this.collectionsRepository.save(collection);
  }
}
export default UseCase;
