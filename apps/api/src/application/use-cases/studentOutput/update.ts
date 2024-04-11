import {
  IUseCase,
  UserSelectDTO,
  IStudentOutputsRepository,
  IEmailService,
  ICollectionsRepository,
} from "@application/interfaces";

type InputParams = {
  user: UserSelectDTO;
  studentOutputId: number;
};

type Return = void;

export type IUpdateStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateStudentOutputUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private emailService: IEmailService,
    private collectionsRepository: ICollectionsRepository
  ) {}

  async execute({ user, studentOutputId }: InputParams) {
    // const existingStudentOutput =
    //   await this.studentOutputsRepository.getById(studentOutputId);
    // if (user.id !== existingStudentOutput.user.id)
    //   throw new UserIsNotOutputAuthor();
    // if (newOutputStatus !== OutputStatus.Completed)
    //   throw new OutputStatusCanOnlyBeUpdatedToCompleted();
    // if (existingStudentOutput.status === OutputStatus.Completed) {
    //   return { statusWasChanged: false };
    // }
    // if (existingStudentOutput.status === OutputStatus.Draft) {
    //   const newOutput = new StudentOutput(studentOutputId);
    //   newOutput.status = OutputStatus.Completed;
    //   await this.studentOutputsRepository.update(newOutput);
    //   const collection =
    //     await this.collectionsRepository.getCollectionByVersionId(
    //       existingStudentOutput.version.id!
    //     );
    //   if (collection.notifyOwnerOnStudentOutput) {
    //     await this.emailService.sendStudentOutputCompletedEmail({
    //       destination: collection.owner.email!,
    //       studentOutputId,
    //       studentName: user.name || "",
    //       activityTitle: existingStudentOutput.version.title,
    //     });
    //   }
    //   const studentOutputCompletedNotification = new Notification();
    //   studentOutputCompletedNotification.buildStudentOutputCompletedNotification(
    //     studentOutputId,
    //     user.name!,
    //     collection.name!,
    //     existingStudentOutput.version.title,
    //     collection.owner.id
    //   );
    //   await this.notificationsRepository.insert(
    //     studentOutputCompletedNotification
    //   );
    //   return { statusWasChanged: true };
    // }
    // return { statusWasChanged: false };
  }
}

export default UseCase;
