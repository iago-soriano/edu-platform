import { VersionStatus, ActivityVersion, OutputStatus } from "@domain";
import {
  ActivityVersionIsNotDraft,
  ActivityNotFound,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  studentOutputId: number;
  newOutputStatus: OutputStatus;
};

type Return = void;

export type IUpdateStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateStudentOutputUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, studentOutputId, newOutputStatus }: InputParams) {}
}

export default UseCase;
