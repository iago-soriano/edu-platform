import { ActivityVersion, OutputStatus, User } from "@domain";
import {
  CollectionNotFound,
  StudentIsNotParticipant,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  ICollectionParticipationsRepository,
  IStudentOutputsRepository,
  ICollectionsRepository,
} from "@interfaces";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = {
  outputId: number;
};

export type ICreateStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateStudentOutputUseCase {
  constructor(
    private collectionParticipationsRepository: ICollectionParticipationsRepository,
    private collectionsRepository: ICollectionsRepository,
    private studentOutputsRepository: IStudentOutputsRepository,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({ user, activityId, versionId }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
    });

    const collection = await this.collectionsRepository.getById(
      activity.collection?.id || 0
    );

    if (!collection) throw new CollectionNotFound();

    const studentIsParticipant =
      await this.collectionParticipationsRepository.findStudentCollectionRelation(
        user.id,
        collection.id!
      );

    if (collection.isPrivate && !studentIsParticipant)
      throw new StudentIsNotParticipant();

    return await this.studentOutputsRepository.insert({
      user: new User(user.id),
      version: new ActivityVersion(versionId),
      status: OutputStatus.Draft,
    });
  }
}
export default UseCase;
