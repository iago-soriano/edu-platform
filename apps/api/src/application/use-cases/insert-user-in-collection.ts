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
  ICollectionsRepository,
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
    private collectionsRepository: ICollectionsRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({ user, collectionId, studentEmail }: InputParams) {
    const collection = await this.collectionsRepository.getById(collectionId);

    if (collection.owner.id !== user.id) throw new UserIsNotCollectionOwner();

    const student = await this.userRepository.getUserByEmail(studentEmail);

    if (!student) throw new StudentIsNotUser();

    await this.collectionsRepository.insertStudent(student.id, collectionId);
  }
}
export default UseCase;
