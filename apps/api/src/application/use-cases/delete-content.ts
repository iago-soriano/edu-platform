import {
  IUseCase,
  IActivitiesRepository,
  IStorageService,
  UserSelectDTO,
} from "@interfaces";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";
import { ActivityNotFound } from "@edu-platform/common";

type InputParams = {
  activityId: number;
  versionId: number;
  contentId: number;
  user: UserSelectDTO;
};

type Return = void;

export type IDeleteContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements IDeleteContentUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({ user, activityId, versionId, contentId }: InputParams) {
    const { version, activity, content } = await this.getActivityHelper.execute(
      {
        activityId,
        versionId,
        contentId,
      }
    );

    if (!content) return;

    if (activity.authorId !== user.id) throw new ActivityNotFound();

    // TODO: can't just delete the file, because this content might be a copy of an archived one.
    // figure out a way to know if this file isn't being used elewhere
    const fileUrl = content.storedFileUrl();
    if (fileUrl) {
      //await this.storageService.deleteFileByUrl(fileUrl);
    }

    await this.activitiesRepository.Contents.delete(content.id || 0);
  }
}

export default UseCase;
