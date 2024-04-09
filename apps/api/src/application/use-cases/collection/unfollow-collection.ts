import {
  IUseCase,
  UserSelectDTO,
  ICollectionsRepository,
  ICollectionParticipationsRepository,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
};

type Return = void;

export type IUnfollowCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUnfollowCollectionUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user, collectionId }: InputParams) {
    const collection =
      await this.collectionsRepository.findRootById(collectionId);
    if (!collection) throw new Error("Coleção não encontrada");

    // TODO: criar repo method que deleta da collectionParticipations pelo userId e type Follower
  }
}
export default UseCase;
