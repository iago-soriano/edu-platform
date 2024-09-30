import { IEmailService, IUseCase } from "@edu-platform/common/platform";
import {
  INotificationsRepository,
  IStudentOutputsRepository,
  IUserRepository,
} from "../interfaces";
import { StudentOutputCreatedEvent } from "@edu-platform/common/domain/integration-events";
import { NotificationsFactory } from "@core/domain/entities";
import { SilentInvalidStateError } from "@edu-platform/common";

export type IStudentOutputCreatedUseCase = IUseCase<
  StudentOutputCreatedEvent["payload"],
  void
>;

export class UseCase implements IStudentOutputCreatedUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private notificationsRepository: INotificationsRepository,
    private userRepository: IUserRepository,
    private emailService: IEmailService
  ) {}

  async execute(payload: StudentOutputCreatedEvent["payload"]) {
    const studentOutput = await this.studentOutputsRepository.findById(
      payload.studentOutputId
    );

    if (!studentOutput) throw new SilentInvalidStateError("Output not found");

    const student = await this.userRepository.getById(studentOutput.studentId);

    const activityAuthor = await this.userRepository.getById(
      studentOutput.activityAuthorId
    );

    await this.notificationsRepository.save(
      NotificationsFactory.buildStudentOutputCreatedNotification(
        studentOutput.id,
        payload.activityTitle,
        student.name,
        payload.activityAuthorId
      )
    );

    await this.emailService.sendStudentOutputCreatedEmail({
      destination: activityAuthor.email,
      studentOutputId: studentOutput.id,
      studentName: student.name,
      activityTitle: payload.activityTitle,
    });
  }
}
export default UseCase;
