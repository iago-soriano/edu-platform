import {
  ContentTypeTypes,
  Content,
  AudioContent,
  ImageContent,
  TextContent,
  VideoContent,
} from "@domain";
import { ContentTypeNotFound } from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  IStorageService,
  FileType,
} from "@interfaces";

type InputParams = {
  title: string;
  content: string;
  description: string;
  type: ContentTypeTypes;
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
  files?: { image?: FileType[]; audio?: FileType[] };
};

type Return = {
  contentId: number;
};

export type ICreateContentUseCase = IUseCase<InputParams, Return>;

class UseCase implements ICreateContentUseCase {
  constructor(
    private activitiesRepository: IActivitiesRepository,
    private storageService: IStorageService
  ) {}

  async execute({
    title,
    content: requestContent,
    description,
    type,
    user,
    versionId,
    activityId,
    files,
  }: InputParams) {
    const typeOfContent = Content.validateContentType(type);

    let content = requestContent;
    const keyBaseName = `${activityId}/${versionId}`;

    switch (typeOfContent) {
      case "Video":
        VideoContent.validateVideo(content, title, description);
        break;
      case "Audio":
        const audioContent = new AudioContent(content, title, description);
        const url = await this.storageService.uploadFile(
          audioContent.getKeyName(keyBaseName, files.image[0].filename),
          files.image[0]
        );
        content = url;
        break;
      // case "Image":
      //   ImageContent.validateImage(content, title, description);
      //   content = await this.storageService.uploadFile("Teste333", content);
      //   break;
      case "Text":
        TextContent.validateText(content, title, description);
        break;
      default:
        throw new ContentTypeNotFound();
    }

    // this.storageService.uploadFile("Teste333", content);

    return this.activitiesRepository.insertContent({
      title,
      content,
      description,
      type,
      originatingVersionId: versionId,
    });
  }
}

export default UseCase;
