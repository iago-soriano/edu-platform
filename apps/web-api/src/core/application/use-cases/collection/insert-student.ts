import {
  InvalidStateError,
  SilentInvalidStateError,
} from "@edu-platform/common";
import { IUseCase } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  ICollectionsRepository,
  IUserRepository,
} from "../../interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
  studentEmail: string;
};

type Return = void;

export type IInsertUserInCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IInsertUserInCollectionUseCase {
  constructor(
    private collectionsRepository: ICollectionsRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({ user, collectionId, studentEmail }: InputParams) {
    const collection =
      await this.collectionsRepository.findByIdWithParticipants(collectionId);
    if (!collection)
      throw new SilentInvalidStateError(
        `Collection with id ${collectionId} not found`
      );

    const student = await this.userRepository.getByEmail(studentEmail);
    if (!student) throw new InvalidStateError("Student is not user");

    collection.insertStudent(user, student);

    await this.collectionsRepository.save(collection);
  }
}
export default UseCase;
