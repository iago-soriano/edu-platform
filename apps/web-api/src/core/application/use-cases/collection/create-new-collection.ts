import { IUseCase } from "@edu-platform/common/platform";
import { CollectionFactory } from "@core/domain/entities";
import { UserSelectDTO, ICollectionsRepository } from "../../interfaces";

type InputParams = {
  user: UserSelectDTO;
};

type Return = { CollectionId: number };

export type ICreateNewCollectionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewCollectionUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user }: InputParams) {
    const newCollection = CollectionFactory.default(user);

    return this.collectionsRepository.save(newCollection);
  }
}
export default UseCase;
