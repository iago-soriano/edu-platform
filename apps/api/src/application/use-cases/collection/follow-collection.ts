import {
  IUseCase,
  UserSelectDTO,
  ICollectionParticipationsRepository,
  ICollectionsRepository,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
};

type Return = {
  startedFollowing: boolean;
};

export type IInsertFollowerInCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IInsertFollowerInCollectionUseCase {
  constructor(
    private collectionsRepository: ICollectionsRepository,
    private collectionParticipationsRepository: ICollectionParticipationsRepository
  ) {}

  async execute({ user, collectionId }: InputParams) {
    const collection =
      await this.collectionsRepository.findRootById(collectionId);
    if (!collection || collection.isPrivate)
      throw new Error("Coleção não encontrada");

    const isUserAlreadyFollower =
      await this.collectionParticipationsRepository.findByParticipantAndCollectionId(
        user.id,
        collectionId
      );

    if (isUserAlreadyFollower) return { startedFollowing: false }; //TODO

    await this.collectionParticipationsRepository.insertParticipant(
      user.id,
      collectionId,
      "Follower"
    );

    return { startedFollowing: true };
  }
}
export default UseCase;
