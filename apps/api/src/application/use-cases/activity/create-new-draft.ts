import { IUseCase, IActivitiesRepository, UserSelectDTO } from "@interfaces";
import { IActivitiesFactory } from "@domain";
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
    private activitiesFactory: IActivitiesFactory
  ) {}

  async execute({ activityId, user }: InputParams) {
    const activity =
      await this.activitiesRepository.findRootByIdWithContents(activityId);

    if (!activity) throw new ActivityNotFound();

    activity.throwIfCantCreateNewDraft(user);

    activity.setDraftVersion(
      this.activitiesFactory.Versions.withElementsFrom(activity.lastVersion!)
    );

    await this.activitiesRepository.save(activity);
  }
}

export default UseCase;
