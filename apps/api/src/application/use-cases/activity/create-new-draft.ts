import { IUseCase } from "@edu-platform/common/platform";
import { IActivitiesRepository, UserSelectDTO } from "@application/interfaces";
import { ActivityNotFound } from "@edu-platform/common";

type InputParams = {
  activityId: string;
  user: UserSelectDTO;
};

type Return = void;

export type ICreateNewDraftVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateNewDraftVersionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ activityId, user }: InputParams) {
    const activity =
      await this.activitiesRepository.findRootByIdWithElements(activityId);

    if (!activity) throw new ActivityNotFound();

    activity.createNewDraft(user);

    await this.activitiesRepository.save(activity);
  }
}

export default UseCase;
