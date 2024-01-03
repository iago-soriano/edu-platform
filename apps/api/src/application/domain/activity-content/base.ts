import {
  ContentTypeNotFound,
  TitleIsTooLong,
  TitleIsTooShort,
  DomainRules,
  DescriptionIsTooLong,
  DescriptionIsTooShort,
  ActivityContentNotCreated,
  ActivityConstants,
} from "@edu-platform/common";
import { ImageContent, VideoContent, TextContent } from "@domain";
import { FileType } from "@interfaces";

export type ContentTypesType =
  (typeof ActivityConstants.contentPossibleTypes)[number];

export abstract class Content {
  constructor(
    public type: string,
    public id?: number,
    public title?: string,
    public description?: string,
    public order?: number,
    public originatingVersionId?: number,
    public parentId?: number
  ) {}

  static validateContentType(contentType: string) {
    for (let type of ActivityConstants.contentPossibleTypes) {
      if (contentType === type) {
        return type;
      }
    }

    throw new ContentTypeNotFound();
  }

  static validateTitle(title: string) {
    if (!title) return;
    if (title.length > DomainRules.CONTENT.TITLE.MAX_LENGTH) {
      throw new TitleIsTooLong();
    } else if (title.length < DomainRules.CONTENT.TITLE.MIN_LENGTH) {
      throw new TitleIsTooShort();
    }
  }

  static validateDescription(description: string) {
    if (!description) return;
    if (description.length > DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH) {
      throw new DescriptionIsTooLong();
    } else if (
      description.length < DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH
    ) {
      throw new DescriptionIsTooShort();
    }
  }

  static createContent(
    content: Partial<Content> & {
      imageFile?: FileType;
      tracks?: string;
      videoUrl?: string;
      imageUrl?: string;
      text?: string;
    }
  ) {
    const newContentType = Content.validateContentType(content.type);

    Content.validateDescription(content.description);
    Content.validateTitle(content.title);

    switch (newContentType) {
      case "Video":
        return new VideoContent(
          newContentType,
          content.id,
          content.title,
          content.description,
          content.tracks,
          content.videoUrl,
          content.order,
          content.originatingVersionId,
          content.parentId
        );
      case "Image":
        return new ImageContent(
          newContentType,
          content.id,
          content.title,
          content.description,
          content.imageFile,
          content.imageUrl,
          content.order,
          content.originatingVersionId,
          content.parentId
        );
      case "Text":
        return new TextContent(
          newContentType,
          content.id,
          content.title,
          content.description,
          content.text,
          content.order,
          content.originatingVersionId,
          content.parentId
        );

      default:
        throw new ActivityContentNotCreated();
    }
  }
}
