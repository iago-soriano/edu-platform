import {
  ContentTypeNotFound,
  TitleIsTooLong,
  TitleIsTooShort,
  DomainRules,
  DescriptionIsTooLong,
  DescriptionIsTooShort,
} from "@edu-platform/common";

export const contentPossibleTypes = [
  "Video",
  "Image",
  "Audio",
  "Text",
] as const;

export type ContentTypesType = (typeof contentPossibleTypes)[number];

export abstract class Content {
  constructor(
    public title: string,
    public description: string
  ) {
    if (description) this.validateDescription();
    if (title) this.validateTitle();
  }

  static validateContentType(contentType: string) {
    for (let type of contentPossibleTypes) {
      if (contentType === type) {
        return type;
      }
    }

    throw new ContentTypeNotFound();
  }

  validateTitle() {
    if (this.title.length > DomainRules.CONTENT.TITLE.MAX_LENGTH) {
      throw new TitleIsTooLong();
    } else if (this.title.length < DomainRules.CONTENT.TITLE.MIN_LENGTH) {
      throw new TitleIsTooShort();
    }
  }

  validateDescription() {
    if (this.description.length > DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH) {
      throw new DescriptionIsTooLong();
    } else if (
      this.description.length < DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH
    ) {
      throw new DescriptionIsTooShort();
    }
  }
}
