import {
  ActivityContentNotFound,
  ActivityNotFound,
  ActivityVersionIsNotDraft,
  ActivityVersionNotFound,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  IStorageService,
  IIdGenerator,
} from "@interfaces";
import { Content, VersionStatus } from "@domain";
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
    private idService: IIdGenerator
  ) {}

  async execute({
    content: newContent,
    user,
    activityId,
    versionId,
  }: InputParams) {
    const version = await this.activitiesRepository.Versions.findById(
      versionId,
      activityId
    );
    if (!version) throw new ActivityVersionNotFound();

    if (version.activity.author.id !== user.id) throw new ActivityNotFound();

    if (version.status !== VersionStatus.Draft)
      throw new ActivityVersionIsNotDraft();

    // try to upload whatever file is sent. Will not persist content if this doesn't work
    if (newContent.shouldUploadFile()) {
      const keyName = `${version.activity.id}/${
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

      newContent.version.id = versionId;

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

    await this.activitiesRepository.Contents.update(existingContent);
  }
}
export default UseCase;
