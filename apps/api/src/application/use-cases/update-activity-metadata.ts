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
  }: InputParams) {
    const existingActivity =
      await this.activitiesRepository.getActivityById(activityId);

    if (!existingActivity) throw new ActivityIsNotFound();

    if (existingActivity.authorId !== user.id)
      throw new UserNotActivityAuthor();

    if (existingActivity.draftVersionId != versionId)
      throw new ActivityIsNotFound();

    const activityVersion =
      await this.activitiesRepository.getVersionById(versionId);

    if (activityVersion.activityId != activityId)
      throw new ActivityIsNotFound();
    if (activityVersion.status !== "Draft") throw new ActivityIsNotDraft();

    title && Activity.validateTitle(title);
    description && Activity.validateDescription(description);

    await this.activitiesRepository.updateActivityVersionMetadata(versionId, {
      title: title,
      description: description,
    });
  }
}

export default UseCase;
