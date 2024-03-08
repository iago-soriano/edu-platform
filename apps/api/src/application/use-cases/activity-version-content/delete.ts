import {
  IUseCase,
  IActivitiesRepository,
  IStorageService,
  UserSelectDTO,
} from "@interfaces";
import {
  ActivityNotFound,
  ActivityVersionNotFound,
} from "@edu-platform/common";

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
    private storageService: IStorageService
  ) {}

  async execute({ user, activityId, versionId, contentId }: InputParams) {
    const version = await this.activitiesRepository.Versions.findById(
      versionId,
      activityId
    );
    if (!version) throw new ActivityVersionNotFound();
    if (version.activity.author.id !== user.id) throw new ActivityNotFound();

    const content =
      await this.activitiesRepository.Contents.findById(contentId);
    if (!content) return;

    // TODO: can't just delete the file, because this content might be a copy of an archived one.
    // figure out a way to know if this file isn't being used elewhere
    const fileUrl = content.storedFileUrl();
    if (fileUrl) {
      //await this.storageService.deleteFileByUrl(fileUrl);
    }

    await this.activitiesRepository.Contents.delete(content.id!);
  }
}

export default UseCase;
