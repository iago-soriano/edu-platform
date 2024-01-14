import { Activity } from "@domain";
import {
  ActivityIsNotDraft,
  ActivityIsNotFound,
  UserNotActivityAuthor,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";

type InputParams = {
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
  title?: string;
  description?: string;
  topics?: string;
};

type Return = void;

export type IUpdateActivityMetadataUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateActivityMetadataUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({
    user,
    activityId,
    versionId,
    title,
    description,
    topics,
  }: InputParams) {
    const existingActivity =
      await this.activitiesRepository.findActivityById(activityId);

    if (!existingActivity) throw new ActivityIsNotFound();

    if (existingActivity.authorId !== user.id)
      throw new UserNotActivityAuthor();

    if (existingActivity.draftVersionId != versionId)
      throw new ActivityIsNotFound();

    const { version } =
      await this.activitiesRepository.findVersionById(versionId);

    if (version.activityId != activityId) throw new ActivityIsNotFound();
    if (version.status !== "Draft") throw new ActivityIsNotDraft();

    title && Activity.validateTitle(title);
    description && Activity.validateDescription(description);
    topics && Activity.validateTopics(topics);

    await this.activitiesRepository.updateActivityVersion(versionId, {
      title,
      description,
      topics,
    });
  }
}

export default UseCase;
