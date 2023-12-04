import { Activity } from "@domain";
import {
  ActivityIsNotDraft,
  ActivityIsNotFound,
  UserNotActivityAuthor,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  ActivityContentSelectDTO,
  QuestionSelectDTO,
} from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = {
  title: string;
  description: string;
  elements: (ActivityContentSelectDTO | QuestionSelectDTO)[];
};

export type IGetActivityVersionUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetActivityVersionUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({ user, versionId, activityId }: InputParams) {
    const activity =
      await this.activitiesRepository.getActivityById(activityId);

    const version = await this.activitiesRepository.getVersionById(versionId);

    if (version.activityId != activityId)
      throw new Error("Activity Id and version Id don't match");

    if (version.status == "Draft" && activity.authorId !== user.id)
      throw new Error("Non-author cannot get draft version");

    return this.activitiesRepository.getVersionById(version.id);
  }
}

export default UseCase;
