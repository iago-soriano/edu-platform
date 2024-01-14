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
  CompleteVersionSelectDTO,
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
    version: CompleteVersionSelectDTO;
  }) {
    if (version.version.status !== "Draft") throw new ActivityIsNotDraft();

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
      newContent.setFileUrl(fileUrl);
    }

    // new content
    if (!dto.id) {
      this.handleInsertNew(version.version.id, newContent);
      return;
    }

    // find by id
    const contentDbDto =
      await this.activitiesRepository.findActivityContentById(dto.id);
    if (!contentDbDto) throw new ActivityContentNotFound();

    const existingContent = Content.mapFromDatabaseDto(contentDbDto);

    existingContent.merge(version.version.id, newContent);
    existingContent.mergePayload(newContent as any); // TODO: make this type work

    if (!existingContent.id) {
      const insertedContentFromExisting =
        await this.activitiesRepository.insertContent(
          existingContent.mapToDatabaseDto()
        );
      await this.activitiesRepository.insertRelationBetweenVersionAndElement(
        version.version.id,
        insertedContentFromExisting.contentId
      );
    } else {
      await this.activitiesRepository.updateContent(
        existingContent.id,
        existingContent.mapToDatabaseDto(),
        version.version.id
      );
    }
  }

  async handleInsertNew(versionId: number, content: Content) {
    // validate incoming content
    content.validateTitle();
    content.validateDescription();
    content.validatePayload();

    // persist it
    const insertedNewContent = await this.activitiesRepository.insertContent({
      ...content.mapToDatabaseDto(),
      originatingVersionId: versionId,
    });
    await this.activitiesRepository.insertRelationBetweenVersionAndElement(
      versionId,
      insertedNewContent.contentId
    );
  }
}
export default UseCase;
