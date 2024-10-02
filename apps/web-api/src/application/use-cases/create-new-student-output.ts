import { IUseCase } from '@edu-platform/common/platform';
import { UserSelectDTO } from 'application/interfaces';

type InputParams = {
  user: UserSelectDTO;
  activityId: string;
};

type Return = void;

export type ICreateStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateStudentOutputUseCase {
  constructor() {}

  async execute({ user, activityId }: InputParams) {}
}
export default UseCase;
