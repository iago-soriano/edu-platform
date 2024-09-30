import { IEmailService, IUseCase } from "@edu-platform/common/platform";
import {
  INotificationsRepository,
  IStudentOutputsRepository,
  IUserRepository,
} from "../interfaces";
import {
  ActivityPublishedEvent,
  FeedbackToAnswerPublishedEvent,
} from "@edu-platform/common/domain/integration-events";
import { NotificationsFactory } from "@core/domain/entities";
import { SilentInvalidStateError } from "@edu-platform/common";

export type IFeedbackPublishedUseCase = IUseCase<
  FeedbackToAnswerPublishedEvent["payload"],
  void
>;

class UseCase implements IFeedbackPublishedUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private notificationsRepository: INotificationsRepository,
    private userRepository: IUserRepository,
    private emailService: IEmailService
  ) {}

  async execute(payload: FeedbackToAnswerPublishedEvent["payload"]) {
    const studentOutput = await this.studentOutputsRepository.findById(
      payload.studentOutputId
    );

    if (!studentOutput) throw new SilentInvalidStateError("Output not found");

    const student = await this.userRepository.getById(studentOutput.studentId);

    const activityAuthor = await this.userRepository.getById(
      studentOutput.activityAuthorId
    );

    await this.notificationsRepository.save(
      NotificationsFactory.buildFeedbackPublishedNotification(
        studentOutput.id,
        payload.activityTitle,
        activityAuthor.name,
        student.email
      )
    );

    await this.emailService.sendFeedbackToAnswerPublishedEmail({
      destination: student.email,
      studentOutputId: studentOutput.id,
      activityTitle: payload.activityTitle,
      authorName: activityAuthor.name,
    });
  }
}
export default UseCase;
