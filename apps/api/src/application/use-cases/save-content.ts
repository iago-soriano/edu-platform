import {
  ActivityContentNotFound,
  ActivityIsNotFound,
  ActivityVersionNotFound,
  ActivityIsNotDraft,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  ActivitySelectDTO,
  IActivitiesRepository,
  IStorageService,
  FileType,
  IIdGenerator,
  ActivityVersionSelectDTO,
} from "@interfaces";
import { ContentDTO } from "@dto";
import { Content, VersionStatus } from "@domain";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";
import { getFileExtension } from "@infrastructure";

type InputParams = {
  contentDto: ContentDTO;
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

  async execute({ contentDto, user, activityId, versionId }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
      contentId: contentDto.id,
    });

    if (activity.authorId !== user.id) throw new ActivityIsNotFound();

    return this.handle({ dto: contentDto, user, activity, version });
  }

  async handle({
    dto,
    user,
    activity,
    version,
  }: {
    dto: ContentDTO;
    user: UserSelectDTO;
    activity: ActivitySelectDTO;
    version: ActivityVersionSelectDTO;
  }) {
    if (version.status !== VersionStatus.Draft) throw new ActivityIsNotDraft();

    const newContent = Content.mapFromDto(dto);

    // try to upload whatever file is sent. Will not persist content if this doesn't work
    if (newContent.shouldUploadFile()) {
      const keyName = `${activity.id}/${
        newContent.id
      }/${this.idService.getId()}.${getFileExtension(newContent.file)}`;
      const fileUrl = await this.storageService.uploadFile(
        keyName,
        newContent.file
      );
      if (!fileUrl)
        throw new Error("There was an error uploading the file to S3");
      // if(newContent.) // TODO: remove old file
      newContent.setFileUrl(fileUrl);
    }

    // new content
    if (!dto.id) {
      // validate incoming content
      newContent.validateTitle();
      newContent.validateDescription();
      newContent.validatePayload();

      // persist it
      await this.activitiesRepository.Contents.insert({
        ...newContent.mapToDatabaseDto(),
      });

      return;
    }

    // find by id
    const contentDbDto = await this.activitiesRepository.Contents.findById(
      dto.id
    );
    if (!contentDbDto) throw new ActivityContentNotFound();

    const existingContent = Content.mapFromDatabaseDto(contentDbDto);

    existingContent.merge(newContent);
    existingContent.mergePayload(newContent as any); // TODO: make this type work

    await this.activitiesRepository.Contents.update(
      dto.id,
      existingContent.mapToDatabaseDto(),
      version.id
    );
  }
}
export default UseCase;
