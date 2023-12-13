import { Activity } from "@domain";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  statuses: string[];
};

type Return = {
  title: string;
  description: string;
  updatedAt: Date;
  id: number;
  status: string;
  activityId: number;
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
        id: ac.id,
        activityId: ac.activityId,
      };
    });

    return activitiesByAuthor;
  }
}

export default UseCase;
