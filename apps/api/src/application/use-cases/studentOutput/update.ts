import { OutputStatus, StudentOutput, Notification } from "@domain";
import {
  UserIsNotOutputAuthor,
  OutputStatusCanOnlyBeUpdatedToCompleted,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IStudentOutputsRepository,
  IEmailService,
  ICollectionsRepository,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  studentOutputId: number;
  newOutputStatus: OutputStatus;
};

type Return = { statusWasChanged: boolean };

export type IUpdateStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateStudentOutputUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private emailService: IEmailService,
    private collectionsRepository: ICollectionsRepository
  ) {}

  async execute({ user, studentOutputId, newOutputStatus }: InputParams) {
    const existingStudentOutput =
      await this.studentOutputsRepository.getById(studentOutputId);

    if (user.id !== existingStudentOutput.user.id)
      throw new UserIsNotOutputAuthor();

    if (newOutputStatus !== OutputStatus.Completed)
      throw new OutputStatusCanOnlyBeUpdatedToCompleted();

    if (existingStudentOutput.status === OutputStatus.Completed) {
      return { statusWasChanged: false };
    }

    // TODO: pegar a collection pelo studentOutputId (criar um novo método, join)
    // TODO: Pegar o dono da collection e a setting de notification. Criar entidade de notification e, a depender do setting da collection, mandar e-mail
    if (existingStudentOutput.status === OutputStatus.Draft) {
      const newOutput = new StudentOutput(studentOutputId);
      newOutput.status = OutputStatus.Completed;

      await this.studentOutputsRepository.update(newOutput);

      const collection =
        await this.collectionsRepository.getCollectionByVersionId(
          existingStudentOutput.version.id!
        );

      if (collection.notifyOwnerOnStudentOutput) {
        await this.emailService.sendStudentOutputCompletedEmail({
          destination: collection.owner.email!,
          url: `seinão`, //TODO
        });
      }

      // const notification = Notification.BuildStudentOutputCompletedNotification();

      // await this.notificationRepo.inser(notification);

      return { statusWasChanged: true };
    }

    return { statusWasChanged: false };
  }
}

export default UseCase;
