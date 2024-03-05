import {
  UserIsNotDraftAuthor,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import { ActivityVersion } from "@domain";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};
type Return = ActivityVersion;

export type IGetActivityVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetActivityVersionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, activityId, versionId }: InputParams) {
    const version = await this.activitiesRepository.Versions.findFullViewById(
      versionId,
      activityId
    );
    if (!version) throw new ActivityVersionNotFound();

    if (version.status == "Draft" && version.activity.author.id !== user.id)
      throw new UserIsNotDraftAuthor();

    return version!;
  }
}

export default UseCase;
