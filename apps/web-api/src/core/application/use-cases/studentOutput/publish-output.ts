import { IUseCase, IEmailService } from "@edu-platform/common/platform";
import {
  UserSelectDTO,
  IStudentOutputsRepository,
  ICollectionsRepository,
} from "../../interfaces";
import { SilentInvalidStateError } from "@edu-platform/common";
import { OutputStatus } from "@core/domain/entities";

type InputParams = {
  user: UserSelectDTO;
  studentOutputId: number;
};

type Return = void;

export type IPublishStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements IPublishStudentOutputUseCase {
  constructor(
    private studentOutputsRepository: IStudentOutputsRepository,
    private emailService: IEmailService,
    private collectionsRepository: ICollectionsRepository
  ) {}

  async execute({ user, studentOutputId }: InputParams) {
    const existingStudentOutput =
      await this.studentOutputsRepository.findById(studentOutputId);

    if (!existingStudentOutput)
      throw new SilentInvalidStateError("Student output not found");

    existingStudentOutput.publishStudentOutput(user.id);

    await this.studentOutputsRepository.save(existingStudentOutput);
  }
}

export default UseCase;
