import { IUseCase } from "@edu-platform/common/platform";
import { UserSelectDTO, ICollectionsRepository } from "@application/interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
  participationId: number;
};

type Return = void;

export type IRemoveStudentFromCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IRemoveStudentFromCollectionUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user, collectionId, participationId }: InputParams) {
    const collection =
      await this.collectionsRepository.findRootByIdWithParticipants(
        collectionId
      );
    if (!collection) throw new Error("Coleção não encontrada");

    // collection.removeStudent(user, participationId);

    await this.collectionsRepository.save(collection);
  }
}
export default UseCase;
