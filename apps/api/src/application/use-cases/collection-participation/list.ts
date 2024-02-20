import {
  IUseCase,
  UserSelectDTO,
  ICollectionParticipationsRepository,
  ICollectionsRepository,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
};

type Return = { id: number; name: string; email: string }[];

export type IListUsersInCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IListUsersInCollectionUseCase {
  constructor(
    private collectionParticipationsRepository: ICollectionParticipationsRepository,
    private collectionsRepository: ICollectionsRepository
  ) {}

  async execute({ user, collectionId }: InputParams) {
    const collection = await this.collectionsRepository.getById(collectionId);
    if (!collection) throw new Error("Coleção não encontrada");

    if (collection.owner.id !== user.id)
      throw new Error("Collection not found");

    return (
      await this.collectionParticipationsRepository.findParticipatingStudents(
        collectionId
      )
    ).map((user) => ({
      id: user.id || 0,
      name: user.name || "",
      email: user.email || "",
    })); //TODO: map to dto
  }
}
export default UseCase;
