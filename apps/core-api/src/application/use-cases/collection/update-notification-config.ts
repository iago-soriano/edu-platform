import { IUseCase } from "@edu-platform/common/platform";
import { UserSelectDTO, ICollectionsRepository } from "@application/interfaces";
import { SilentInvalidStateError } from "@edu-platform/common";

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
};

type Return = void;

export type IUpdateNotificationConfigUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateNotificationConfigUseCase {
  constructor(private collectionsRepository: ICollectionsRepository) {}

  async execute({ user, collectionId }: InputParams) {
    const collection = await this.collectionsRepository.findById(collectionId);
    if (!collection)
      throw new SilentInvalidStateError(
        `Collection with collection id ${collectionId} not found`
      );
  }
}
export default UseCase;
