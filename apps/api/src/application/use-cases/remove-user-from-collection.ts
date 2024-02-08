import { UserIsNotCollectionOwner } from "@edu-platform/common";
import { IUseCase, UserSelectDTO, ICollections } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
  studentId: number;
};

type Return = { alreadyRemoved: boolean };

export type IRemoveUserFromCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IRemoveUserFromCollectionUseCase {
  constructor(private collections: ICollections) {}

  async execute({ user, collectionId, studentId }: InputParams) {
    const collection = await this.collections.getById(collectionId);

    if (collection.ownerId !== user.id) throw new UserIsNotCollectionOwner();

    const studentAssociatedWithCollection =
      await this.collections.findStudentCollectionRelation(
        studentId,
        collectionId
      );

    if (studentAssociatedWithCollection) {
      await this.collections.removeStudent(studentId, collectionId);
      return { alreadyRemoved: false };
    } else {
      return { alreadyRemoved: true };
    }
  }
}
export default UseCase;
