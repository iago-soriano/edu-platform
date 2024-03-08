import { ActivityVersion, OutputStatus, User } from "@domain";
import {
  CollectionNotFound,
  StudentIsNotParticipant,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  ICollectionParticipationsRepository,
  IStudentOutputsRepository,
  ICollectionsRepository,
  IActivitiesRepository,
} from "@interfaces";

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
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({ user, activityId, versionId }: InputParams) {
    const version = await this.activitiesRepository.Versions.findById(
      versionId,
      activityId
    );
    if (!version) throw new ActivityVersionNotFound();

    const collection = await this.collectionsRepository.getById(
      version.activity.collection?.id
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
