import {
  IUseCase,
  IActivitiesRepository,
  ActivitySelectDTO,
  CompleteVersionSelectDTO,
  UserSelectDTO,
} from "@interfaces";
import { ActivityIsNotFound } from "@edu-platform/common";

type InputParams = {
  user: UserSelectDTO;
  activity: ActivitySelectDTO;
};

type Return = void;

export type IValidateActivityUserRelationUseCaseMiddleware = IUseCase<
  InputParams,
  Return
>;

class UseCase implements IValidateActivityUserRelationUseCaseMiddleware {
  constructor() {}

  async execute({ user, activity }: InputParams) {
    if (activity.authorId !== user.id) throw new ActivityIsNotFound();
  }
}

export default UseCase;
