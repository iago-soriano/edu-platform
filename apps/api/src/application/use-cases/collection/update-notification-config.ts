import { IUseCase, UserSelectDTO, ICollectionsRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
};

type Return = void;

export type IUpdateNotificationConfigUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateNotificationConfigUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user, collectionId }: InputParams) {
    const collection =
      await this.collectionsRepository.findRootById(collectionId);
    if (!collection) throw new Error("Coleção não encontrada");
  }
}
export default UseCase;
