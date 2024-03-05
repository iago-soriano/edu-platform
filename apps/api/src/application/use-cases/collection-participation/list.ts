import {
  IUseCase,
  UserSelectDTO,
  ICollectionParticipationsReadRepository,
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
    private collectionParticipationsReadRepository: ICollectionParticipationsReadRepository,
    private collectionsRepository: ICollectionsRepository
  ) {}

  async execute({ user, collectionId }: InputParams) {
    const collection = await this.collectionsRepository.getById(collectionId);
    if (!collection) throw new Error("Coleção não encontrada");

    if (collection.owner.id !== user.id)
      throw new Error("Collection not found");

    return (
      await this.collectionParticipationsReadRepository.listStudents(
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
