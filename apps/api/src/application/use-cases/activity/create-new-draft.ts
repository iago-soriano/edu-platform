import {
  IUseCase,
  IActivitiesRepository,
  UserSelectDTO,
  IIdGenerator,
} from "@interfaces";
import { ActivityNotFound } from "@edu-platform/common";
import { db } from "@infrastructure";

type InputParams = {
  activityId: string;
  user: UserSelectDTO;
};

type Return = void;

export type ICreateNewDraftVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewDraftVersionUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private idService: IIdGenerator
  ) {}

  async execute({ activityId, user }: InputParams) {
    const activity =
      await this.activitiesRepository.findRootByIdWithContents(activityId);

    if (!activity) throw new ActivityNotFound();

    activity.createNewDraftFromPublished(user, this.idService);

    await this.activitiesRepository.save(activity);
  }
}

export default UseCase;
