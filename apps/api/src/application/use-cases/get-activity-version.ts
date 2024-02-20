import { UserIsNotDraftAuthor } from "@edu-platform/common";
import { ActivityVersion, Content, Question } from "@domain";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};
type Return = ActivityVersion;

export type IGetActivityVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetActivityVersionUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({ user, activityId, versionId }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
    });

    if (version.status == "Draft" && activity.author.id !== user.id)
      throw new UserIsNotDraftAuthor();

    const res = await this.activitiesRepository.Versions.findFullViewById(
      version.id
    );
    return res!;
  }
}

export default UseCase;
