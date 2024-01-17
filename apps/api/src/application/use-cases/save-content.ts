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
import { Content } from "@domain";
import {
  IGetActivityUseCaseHelper,
  IValidateActivityUserRelationUseCaseMiddleware,
} from "application/use-case-middlewares";
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
    private getActivityHelper: IGetActivityUseCaseHelper,
    private validateActivityUserRelationUseCaseMiddleware: IValidateActivityUserRelationUseCaseMiddleware
  ) {}

  async execute({ contentDto, user, activityId, versionId }: InputParams) {
    const { version, activity } = await this.getActivityHelper.execute({
      activityId,
      versionId,
    });

    await this.validateActivityUserRelationUseCaseMiddleware.execute({
      user,
      activity,
    });

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
    if (version.status !== "Draft") throw new ActivityIsNotDraft();

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
      this.handleInsertNew(version.id, newContent);
      return;
    }

    // find by id
    const contentDbDto = await this.activitiesRepository.Contents.findById(
      dto.id
    );
    if (!contentDbDto) throw new ActivityContentNotFound();

    const existingContent = Content.mapFromDatabaseDto(contentDbDto);

    existingContent.merge(version.id, newContent);
    existingContent.mergePayload(newContent as any); // TODO: make this type work

    if (!existingContent.id) {
      const insertedContentFromExisting =
        await this.activitiesRepository.Contents.insert(
          existingContent.mapToDatabaseDto()
        );
      await this.activitiesRepository.VersionElements.insert(
        version.id,
        insertedContentFromExisting.contentId
      );
    } else {
      await this.activitiesRepository.Contents.update(
        existingContent.id,
        existingContent.mapToDatabaseDto(),
        version.id
      );
    }
  }

  async handleInsertNew(versionId: number, content: Content) {
    // validate incoming content
    content.validateTitle();
    content.validateDescription();
    content.validatePayload();

    // persist it
    const insertedNewContent = await this.activitiesRepository.Contents.insert({
      ...content.mapToDatabaseDto(),
      originatingVersionId: versionId,
    });
    await this.activitiesRepository.VersionElements.insert(
      versionId,
      insertedNewContent.contentId
    );
  }
}
export default UseCase;
