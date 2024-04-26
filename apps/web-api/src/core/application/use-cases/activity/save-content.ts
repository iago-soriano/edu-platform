import { ContentRequestDTO } from "@edu-platform/common/api";
import { IUseCase } from "@edu-platform/common/platform";
import { UserSelectDTO, IActivitiesRepository } from "../../interfaces";
import { SilentInvalidStateError } from "@edu-platform/common";

type InputParams = {
  contentDto: ContentRequestDTO;
  user: UserSelectDTO;
  activityId: string;
};

type Return = void;

export type ISaveContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveContentUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ contentDto, user, activityId }: InputParams) {
    const activity =
      await this.activitiesRepository.findRootByIdWithElements(activityId);
    if (!activity)
      throw new SilentInvalidStateError(
        `Activity with id ${activityId} not found`
      );

    await activity.upsertContent(user, contentDto);

    await this.activitiesRepository.save(activity);
  }
}
export default UseCase;
