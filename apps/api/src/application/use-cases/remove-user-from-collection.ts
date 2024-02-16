import { UserIsNotCollectionOwner } from "@edu-platform/common";
import { IUseCase, UserSelectDTO, ICollectionsRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
  studentId: number;
};

type Return = { alreadyRemoved: boolean };

export type IRemoveUserFromCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IRemoveUserFromCollectionUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user, collectionId, studentId }: InputParams) {
    const collection = await this.collectionsRepository.getById(collectionId);

    if (collection.owner.id !== user.id) throw new UserIsNotCollectionOwner();

    const studentAssociatedWithCollection =
      await this.collectionsRepository.findStudentCollectionRelation(
        studentId,
        collectionId
      );

    if (studentAssociatedWithCollection) {
      await this.collectionsRepository.removeStudent(studentId, collectionId);
      return { alreadyRemoved: false };
    } else {
      return { alreadyRemoved: true };
    }
  }
}
export default UseCase;
