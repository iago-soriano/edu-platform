import { ContentTypeTypes, Content } from "@domain";
import {
  ActivityContentNotFound,
  ContentTypeNotFound,
} from "@edu-platform/common";
import { IUseCase, UserSelectDTO, IActivitiesRepository } from "@interfaces";
import { AudioContent } from "application/domain/activity-content/audio";
import { ImageContent } from "application/domain/activity-content/image";
import { TextContent } from "application/domain/activity-content/text";
import { VideoContent } from "application/domain/activity-content/video";

type InputParams = {
  title?: string;
  content?: string;
  description?: string;
  type?: ContentTypeTypes;
  contentId: number;
  user: UserSelectDTO;
  activityId: number;
  versionId: number;
};

type Return = {
  contentId: number;
};

export type ICreateNewContentFromExistingUseCase = IUseCase<
  InputParams,
  Return
>;

class UseCase implements ICreateNewContentFromExistingUseCase {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  async execute({
    title,
    content,
    description,
    type,
    contentId,
    user,
    versionId,
  }: InputParams) {
    const typeOfContent = Content.validateContentType(type);

    switch (typeOfContent) {
      case "Video":
        VideoContent.validateVideo(content, title, description);
        break;
      case "Audio":
        // AudioContent.validateAudio(content, title, description);
        // SALVAR O CONTEÚDO NO S3 SE FOR UM CONTEÚDO NOVO
        break;
      case "Image":
        ImageContent.validateImage(content, title, description);
        // SALVAR O CONTEÚDO NO S3 SE FOR UM CONTEÚDO NOVO
        break;
      case "Text":
        TextContent.validateText(content, title, description);
        break;
      default:
        throw new ContentTypeNotFound();
    }

    return await this.activitiesRepository.insertContent({
      title,
      content,
      description,
      type,
      originatingVersionId: versionId,
    });
  }
}

export default UseCase;
