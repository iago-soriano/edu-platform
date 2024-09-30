import { ITopicService, IUseCase } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  IStudentOutputsRepository,
  ICollectionsRepository,
  IActivitiesRepository,
} from "../../interfaces";
import {
  InvalidStateError,
  SilentInvalidStateError,
  StudentOutputCreatedEvent,
} from "@edu-platform/common";
import { StudentOutputFactory } from "core/domain/entities/student-outputs/student-output-factory";

type InputParams = {
  user: UserSelectDTO;
  activityId: string;
};

type Return = void;

export type ICreateStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateStudentOutputUseCase {
  constructor(
    private collectionsRepository: ICollectionsRepository,
    private studentOutputsRepository: IStudentOutputsRepository,
    private activitiesRepository: IActivitiesRepository,
    private topicService: ITopicService,
    private domainTopicArn: string
  ) {}

  async execute({ user, activityId }: InputParams) {
    const activity = await this.activitiesRepository.findRootById(activityId);
    if (!activity) throw new SilentInvalidStateError("Activity not found");

    const collection = await this.collectionsRepository.findById(
      activity.collectionId
    );

    if (!collection) throw new SilentInvalidStateError("Collection not found");

    const existingStudentOutput =
      await this.studentOutputsRepository.findByUserAndVersion(
        user.id,
        activity.id,
        activity.lastVersion?.version || 0
      );

    const newStudentOutput = StudentOutputFactory.from(
      activity,
      user,
      collection,
      existingStudentOutput
    );

    await this.studentOutputsRepository.save(newStudentOutput);

    await this.topicService.send(
      new StudentOutputCreatedEvent({
        studentOutputId: newStudentOutput.id,
        studentId: user.id,
        activityAuthorId: newStudentOutput.activityAuthorId,
        activityTitle: activity.lastVersion!.title.toString(),
      }),
      this.domainTopicArn
    );
  }
}
export default UseCase;
