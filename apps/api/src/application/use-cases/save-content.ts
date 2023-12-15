import {
  ActivityContentNotFound,
  ActivityIsNotFound,
  ActivityVersionNotFound,
  ContentTypeNotFound,
} from "@edu-platform/common";
import {
  IUseCase,
  UserSelectDTO,
  IActivitiesRepository,
  IStorageService,
  FileType,
  IIdGenerator,
  ActivityContentInsertDTO,
} from "@interfaces";
import {
  ContentTypesType,
  Content,
  ImageContent,
  TextContent,
  VideoContent,
} from "@domain";

type InputParams = {
  title: string;
  content: string;
  description: string;
  type: string;
  contentId: number;
  order: number;
  videoPayload?: {
    url: string;
    tracks: string;
  };
  textPayload?: {
    text: string;
  };
  imagePayload?: {
    image: string;
  };
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
  files?: { image?: FileType[] };
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
    title,
    content,
    description,
    type,
    contentId,
    order,
    videoPayload,
    textPayload,
    imagePayload,
    user,
    activityId,
    versionId,
    files,
  }: InputParams) {
    const activity =
      await this.activitiesRepository.getActivityById(activityId);
    if (!activity) throw new ActivityIsNotFound();

    const version = await this.activitiesRepository.getVersionById(versionId);
    if (!version) throw new ActivityVersionNotFound();

    if (contentId) {
      const existingContent =
        await this.activitiesRepository.getActivityContentByContentId(
          contentId
        );
      if (!existingContent) throw new ActivityContentNotFound();
    }

    const newContent = Content.createContent(type, title, description);

    /*  let content = requestContent;

      switch (existingContent.type) {
        case "Video":
          new VideoContent(content, title, description);
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
  } */
  }
}
export default UseCase;
