import { IUseCase } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  IStudentOutputsRepository,
  ICollectionsRepository,
  IActivitiesRepository,
} from "@application/interfaces";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = void;

export type ICreateStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateStudentOutputUseCase {
  constructor(
    private collectionsRepository: ICollectionsRepository,
    private studentOutputsRepository: IStudentOutputsRepository,
    private activitiesRepository: IActivitiesRepository
  ) {}

  async execute({ user, activityId, versionId }: InputParams) {
    // const version = await this.activitiesRepository.Versions.findById(
    //   versionId,
    //   activityId
    // );
    // if (!version) throw new ActivityVersionNotFound();
    // const collection = await this.collectionsRepository.getById(
    //   version.activity.collection?.id
    // );
    // if (!collection) throw new CollectionNotFound();
    // if (!collection.isPrivate) throw new CantCreateOutputOnPublicCollection();
    // const studentIsParticipant =
    //   await this.collectionParticipationsRepository.findByParticipantAndCollectionId(
    //     user.id,
    //     collection.id!
    //   );
    // if (collection.isPrivate && !studentIsParticipant)
    //   //TODO
    //   throw new StudentIsNotParticipant();
    // return await this.studentOutputsRepository.insert({
    //   user: new User(user.id),
    //   version: new ActivityVersion(versionId),
    //   status: OutputStatus.Draft,
    // });
  }
}
export default UseCase;
