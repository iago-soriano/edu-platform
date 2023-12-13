import {
  ContentTypesType,
  AudioContent,
  ImageContent,
  VideoContent,
  TextContent,
} from "@domain";
import { ContentTypeNotFound } from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  IStorageService,
  FileType,
  IIdGenerator,
  ActivityContentSelectDTO,
} from "@interfaces";

type InputParams = {
  title?: string;
  content?: string;
  description?: string;
  contentId: number;
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
  files?: { image?: FileType[]; audio?: FileType[] };
  existingContent: ActivityContentSelectDTO;
};

type Return = void;

export type ICreateNewContentFromExistingUseCase = IUseCase<
  InputParams,
  Return
>;

class UseCase implements ICreateNewContentFromExistingUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService,
    private idService: IIdGenerator
  ) {}

  async execute({
    title,
    content: requestContent,
    description,
    contentId,
    user,
    activityId,
    versionId,
    files,
    existingContent,
  }: InputParams) {
    const newContentFromExisting =
      await this.activitiesRepository.insertContent({
        type: existingContent.type,
        content: existingContent.content,
        description: existingContent.description,
        title: existingContent.title,
        parentId: existingContent.id,
        originatingVersionId: versionId,
      });

    let content = requestContent;

    switch (existingContent.type) {
      case "Video":
        new VideoContent(content, title, description);
        break;
      case "Audio":
        new AudioContent(content, title, description);
        if (files) {
          const audioFile = files.audio[0];
          content = await this.storageService.uploadFile(
            `${activityId}/${this.idService.getId()}.${
              audioFile.mimetype.split("/")[1]
            }`,
            audioFile
          );
        }
        break;
      case "Image":
        new ImageContent(content, title, description);
        if (files) {
          const imageFile = files.image[0];
          content = await this.storageService.uploadFile(
            `${activityId}/${this.idService.getId()}.${
              imageFile.mimetype.split("/")[1]
            }`,
            imageFile
          );
        }
        break;
      case "Text":
        new TextContent(content, title, description);
        break;
      default:
        throw new ContentTypeNotFound();
    }

    await this.activitiesRepository.updateContent(
      newContentFromExisting.contentId,
      {
        title,
        content,
        description,
        type: existingContent.type as ContentTypesType,
        originatingVersionId: versionId,
      },
      versionId
    );

    await this.activitiesRepository.createRelationBetweenVersionAndElement(
      versionId,
      newContentFromExisting.contentId
    );
  }
}
export default UseCase;
