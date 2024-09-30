import { IUseCase, ITopicService } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  IStudentOutputsRepository,
  IActivitiesRepository,
} from "../../interfaces";
import {
  FeedbackToAnswerPublishedEvent,
  SilentInvalidStateError,
} from "@edu-platform/common";

type InputParams = {
  user: UserSelectDTO;
  studentOutputId: number;
};

type Return = void;

export type IPublishFeedbackUseCase = IUseCase<InputParams, Return>;

class UseCase implements IPublishFeedbackUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private topicService: ITopicService,
    private activitiesRepository: IActivitiesRepository,
    private domainTopicArn: string
  ) {}
  async execute({ user, studentOutputId }: InputParams) {
    const output =
      await this.studentOutputsRepository.findById(studentOutputId);

    if (!output) throw new SilentInvalidStateError("Student Output not found");

    output.publishFeedback(user.id);

    await this.studentOutputsRepository.save(output);

    const activity = await this.activitiesRepository.findRootById(
      output.activityId
    );

    await this.topicService.send(
      new FeedbackToAnswerPublishedEvent({
        studentOutputId,
        studentId: output.studentId,
        activityAuthorId: output.activityAuthorId,
        activityTitle: activity!.lastVersion!.title.toString(),
      }),
      this.domainTopicArn
    );
  }
}

export default UseCase;
