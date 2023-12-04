import { Activity } from "@domain";
import {
  ActivityIsNotDraft,
  ActivityIsNotFound,
  UserNotActivityAuthor,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  statuses: string[];
};

type Return = {
  title: string;
  description: string;
  updatedAt: Date;
}[];

export type IGetActivitiesUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetActivitiesUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, statuses }: InputParams) {
    const validStatuses = Activity.validateStatuses(statuses);

    const activitiesByAuthor = (
      await this.activitiesRepository.getActivityVersionsByAuthorIdAndStatuses(
        user.id,
        validStatuses
      )
    ).map((ac) => {
      return {
        title: ac.title,
        description: ac.description,
        updatedAt: ac.updatedAt,
        status: ac.status,
      };
    });

    return activitiesByAuthor;
  }
}

export default UseCase;
