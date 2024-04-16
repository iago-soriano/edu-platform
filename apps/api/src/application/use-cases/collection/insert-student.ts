import { StudentIsNotUser } from "@edu-platform/common";
import { IUseCase } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  ICollectionsRepository,
  IUserRepository,
} from "@application/interfaces";

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
      await this.collectionsRepository.findRootByIdWithParticipants(
        collectionId
      );
    if (!collection) throw new Error("Coleção não encontrada");

    const student = await this.userRepository.getUserByEmail(studentEmail);
    if (!student) throw new StudentIsNotUser();

    // collection.insertStudent(user, student);

    await this.collectionsRepository.save(collection);
  }
}
export default UseCase;
