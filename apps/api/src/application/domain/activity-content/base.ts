import {
  ContentTypeNotFound,
  ContentTitleIsTooLong,
  ContentTitleIsTooShort,
  DomainRules,
  ContentDescriptionIsTooLong,
  ContentDescriptionIsTooShort,
} from "@edu-platform/common";
import { FileType } from "@interfaces";

export enum ContentTypes {
  Video = "Video",
  Text = "Text",
  Image = "Image",
}

export abstract class Content {
  public id?: number;
  public title?: string;
  public description?: string;
  public order?: number;
  public file: FileType | null = null;
  public versionId!: number;

  constructor(public type: ContentTypes) {}

  validateTitle() {
    if (!this.title) return;
    if (this.title.length > DomainRules.CONTENT.TITLE.MAX_LENGTH) {
      throw new ContentTitleIsTooLong();
    } else if (this.title.length < DomainRules.CONTENT.TITLE.MIN_LENGTH) {
      throw new ContentTitleIsTooShort();
    }
  }

  validateDescription() {
    if (!this.description) return;
    if (this.description.length > DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH) {
      throw new ContentDescriptionIsTooLong();
    } else if (
      this.description.length < DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH
    ) {
      throw new ContentDescriptionIsTooShort();
    }
  }

  merge(newContent: Content) {
    this.title = newContent.title;
    this.description = newContent.description;
    this.order = newContent.order;
  }

  abstract hasContent(): boolean;
  abstract mergePayload(newContent: Content): void;

  isEmpty() {
    return !this.title && !this.description && !this.hasContent();
  }

  isHalfCompleted() {
    return (this.title || this.description) && !this.hasContent();
  }

  shouldUploadFile(): boolean {
    return !!this.file;
  }

  abstract validatePayload(): void;

  abstract setFileUrl(url: string): void;

  abstract storedFileUrl(): string | null;
}
