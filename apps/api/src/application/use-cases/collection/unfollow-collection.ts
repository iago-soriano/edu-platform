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

type Return = { alreadyUnfollowed: boolean };

export type IUnfollowCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUnfollowCollectionUseCase {
  constructor(
    private collectionsRepository: ICollectionsRepository,
    private collectionParticipationsRepository: ICollectionParticipationsRepository
  ) {}

  async execute({ user, collectionId }: InputParams) {
    const collection =
      await this.collectionsRepository.findRootById(collectionId);
    if (!collection || collection.isPrivate)
      throw new Error("Coleção não encontrada");

    const followingCollection =
      await this.collectionParticipationsRepository.findByParticipantAndCollectionId(
        user.id,
        collectionId
      );

    if (followingCollection) {
      await this.collectionParticipationsRepository.delete(
        followingCollection.id
      );
      return { alreadyUnfollowed: false };
    } else {
      return { alreadyUnfollowed: true };
    }
  }
}
export default UseCase;
