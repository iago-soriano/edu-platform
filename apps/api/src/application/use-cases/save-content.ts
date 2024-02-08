import {
  ActivityContentNotFound,
  ActivityNotFound,
  ActivityVersionIsNotDraft,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  IStorageService,
  IIdGenerator,
} from "@interfaces";
import { Content, VersionStatus } from "@domain";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";
import { getFileExtension } from "@infrastructure";
import { FailedToUploadFileToS3 } from "@edu-platform/common/errors/domain/question";

type InputParams = {
  content: Content;
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = void;

export type ISaveContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISaveContentUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService,
    private idService: IIdGenerator,
    private getActivityHelper: IGetActivityUseCaseHelper
  ) {}

  async execute({
    content: newContent,
    user,
    activityId,
    versionId,
  }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
      contentId: newContent.id,
    });

    if (activity.authorId !== user.id) throw new ActivityNotFound();

    if (version.status !== VersionStatus.Draft)
      throw new ActivityVersionIsNotDraft();

    // try to upload whatever file is sent. Will not persist content if this doesn't work
    if (newContent.shouldUploadFile()) {
      const keyName = `${activity.id}/${
        newContent.id
      }/${this.idService.getId()}.${getFileExtension(newContent.file)}`;
      const fileUrl = await this.storageService.uploadFile(
        keyName,
        newContent.file
      );
      if (!fileUrl) throw new FailedToUploadFileToS3();
      // if(newContent.) // TODO: remove old file
      newContent.setFileUrl(fileUrl);
    }

    // new content
    if (!newContent.id) {
      // validate incoming content
      newContent.validateTitle();
      newContent.validateDescription();
      newContent.validatePayload();

      newContent.versionId = versionId;

      // persist it
      await this.activitiesRepository.Contents.insert(newContent);

      return;
    }

    // find by id
    const existingContent = await this.activitiesRepository.Contents.findById(
      newContent.id
    );
    if (!existingContent) throw new ActivityContentNotFound();

    existingContent.merge(newContent);
    existingContent.mergePayload(newContent as any); // TODO: make this type work
    existingContent.validatePayload();

    await this.activitiesRepository.Contents.update(
      existingContent.id || 0,
      existingContent,
      version.id
    );
  }
}
export default UseCase;
