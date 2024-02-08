import { UserRepository } from "./../../infrastructure/repository/repositories/user";
import { Collection } from "@domain";
import {
  StudentIsNotUser,
  UserIsNotCollectionOwner,
  UserIsNotTeacher,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  ICollections,
  IUserRepository,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
  studentEmail: string;
};

type Return = void;

export type IInsertUserInCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IInsertUserInCollectionUseCase {
  constructor(
    private collections: ICollections,
    private userRepository: IUserRepository
  ) {}

  async execute({ user, collectionId, studentEmail }: InputParams) {
    const collection = await this.collections.getById(collectionId);

    if (collection.ownerId !== user.id) throw new UserIsNotCollectionOwner();

    const student = await this.userRepository.getUserByEmail(studentEmail);

    if (!student) throw new StudentIsNotUser();

    await this.collections.insertStudent(student.id, collectionId);
  }
}
export default UseCase;
