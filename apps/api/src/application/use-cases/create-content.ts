import {
  ContentTypesType,
  Content,
  AudioContent,
  ImageContent,
  TextContent,
  VideoContent,
} from "@domain";
import { ContentTypeNotFound } from "@edu-platform/common";
import {
  IUseCase,
  IActivitiesRepository,
  IStorageService,
  FileType,
  IIdGenerator,
} from "@interfaces";

type InputParams = {
  title?: string;
  content?: string;
  description?: string;
  type: string;
  activityId: number;
  versionId: number;
  order: number;
  files?: { image?: FileType[]; audio?: FileType[] };
};

type Return = {
  contentId: number;
};

export type ICreateContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateContentUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService,
    private idService: IIdGenerator
  ) {}

  async execute({
    title,
    content: requestContent,
    description,
    type,
    versionId,
    activityId,
    files,
    order,
  }: InputParams) {
    const typeOfContent = Content.validateContentType(type);

    let content = requestContent;

    switch (typeOfContent) {
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

    const createdContentId = await this.activitiesRepository.insertContent({
      title,
      content,
      description,
      type: type as ContentTypesType,
      originatingVersionId: versionId,
      order,
    });

    await this.activitiesRepository.createRelationBetweenVersionAndElement(
      versionId,
      createdContentId.contentId
    );

    return createdContentId;
  }
}

export default UseCase;
