import { IUseCase } from '@edu-platform/common/platform';
import { UserSelectDTO, IActivitiesRepository } from '../interfaces';

type InputParams = {
  user: UserSelectDTO;
  collectionId: number;
};

type Return = {
  //activityId: string;
};

export type ICreateNewActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewActivityUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, collectionId }: InputParams) {}
}

export default UseCase;
