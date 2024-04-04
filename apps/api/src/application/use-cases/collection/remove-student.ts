import { UserIsNotCollectionOwner } from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  ICollectionsRepository,
  ICollectionParticipationsRepository,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
  participationId: number;
};

type Return = { alreadyRemoved: boolean };

export type IRemoveStudentFromCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IRemoveStudentFromCollectionUseCase {
  constructor(
    private collectionsRepository: ICollectionsRepository,
    private collectionParticipationsRepository: ICollectionParticipationsRepository
  ) {}

  async execute({ user, collectionId, participationId }: InputParams) {
    const collection =
      await this.collectionsRepository.findRootById(collectionId);
    if (!collection) throw new Error("Coleção não encontrada");

    if (collection.ownerId !== user.id) throw new UserIsNotCollectionOwner();

    const studentAssociatedWithCollection =
      await this.collectionParticipationsRepository.findById(participationId);

    if (studentAssociatedWithCollection) {
      await this.collectionParticipationsRepository.delete(participationId);
      return { alreadyRemoved: false };
    } else {
      return { alreadyRemoved: true };
    }
  }
}
export default UseCase;
