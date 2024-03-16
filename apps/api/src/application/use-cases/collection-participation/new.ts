import {
  StudentIsNotUser,
  UserIsNotCollectionOwner,
  UserIsNotTeacher,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  ICollectionParticipationsRepository,
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
    private collectionParticipationsRepository: ICollectionParticipationsRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({ user, collectionId, studentEmail }: InputParams) {
    const collection = await this.collectionsRepository.getById(collectionId);
    if (!collection) throw new Error("Coleção não encontrada");

    if (collection.owner.id !== user.id) throw new UserIsNotCollectionOwner();

    const student = await this.userRepository.getUserByEmail(studentEmail);

    if (!student) throw new StudentIsNotUser();

    await this.collectionParticipationsRepository.insertStudent(
      student.id,
      collectionId,
      "Follower"
    );
  }
}
export default UseCase;
