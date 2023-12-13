import { ContentTypeNotFound } from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  IStorageService,
  FileType,
  IIdGenerator,
} from "@interfaces";
import {
  ContentTypesType,
  Content,
  AudioContent,
  ImageContent,
  TextContent,
  VideoContent,
} from "@domain";

type InputParams = {
  title?: string;
  content?: string;
  description?: string;
  //type?: string;
  contentId: number;
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
  files?: { image?: FileType[]; audio?: FileType[] };
  start?: number;
  end?: number;
};

type Return = void;

export type IEditContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements IEditContentUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService,
    private idService: IIdGenerator
  ) {}

  async execute({
    title,
    content: requestContent,
    description,
    //type,
    contentId,
    user,
    activityId,
    versionId,
    files,
    start,
    end,
  }: InputParams) {
    const existingContent =
      await this.activitiesRepository.getActivityContentByContentId(contentId); // colocando aqui consigo pegar o type ao invés de receber pelo body

    //const typeOfContent = Content.validateContentType(type);

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

    if (
      existingContent.type === "Audio" ||
      (existingContent.type === "Image" && existingContent.content && files)
    ) {
      this.storageService.deleteFile(existingContent.content);
    }

    await this.activitiesRepository.updateContent(
      contentId,
      {
        title,
        content,
        description,
        start,
        end,
      },
      versionId
    );
  }
}

export default UseCase;
