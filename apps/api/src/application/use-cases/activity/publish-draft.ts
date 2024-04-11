import { ActivityNotFound } from "@edu-platform/common/";
import {
  IActivitiesRepository,
  IUseCase,
  UserSelectDTO,
} from "@application/interfaces";

type InputParams = {
  user: UserSelectDTO;
  activityId: string;
};

type Return = void;

export type IPublishDraftUseCase = IUseCase<InputParams, Return>;

class UseCase implements IPublishDraftUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}
  async execute({ user, activityId }: InputParams) {
    const activity =
      await this.activitiesRepository.findRootByIdWithElements(activityId);
    if (!activity) throw new ActivityNotFound();

    await activity.publishCurrentDraft(user);

    await this.activitiesRepository.save(activity);
  }
}
export default UseCase;
