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
import {
  ActivityContentInsertDTO,
  ActivityContentSelectDTO,
  ActivityInsertDTO,
  ActivitySelectDTO,
  FileType,
} from "@interfaces";
import { ContentDTO } from "@dto";

export type ContentTypesType =
  (typeof ActivityConstants.contentPossibleTypes)[number];

export abstract class Content {
  public id?: number;
  public title?: string;
  public description?: string;
  public order?: number;
  public originatingVersionId?: number;
  public parentId?: number;
  public file: FileType | null = null;

  constructor(public type: ContentTypesType) {}

  // is this necessary?
  static validateContentType(contentType: string) {
    for (let type of ActivityConstants.contentPossibleTypes) {
      if (contentType === type) {
        return type;
      }
    }

    throw new ContentTypeNotFound();
  }

  validateTitle() {
    if (!this.title) return;
    if (this.title.length > DomainRules.CONTENT.TITLE.MAX_LENGTH) {
      throw new TitleIsTooLong();
    } else if (this.title.length < DomainRules.CONTENT.TITLE.MIN_LENGTH) {
      throw new TitleIsTooShort();
    }
  }

  validateDescription() {
    if (!this.description) return;
    if (this.description.length > DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH) {
      throw new DescriptionIsTooLong();
    } else if (
      this.description.length < DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH
    ) {
      throw new DescriptionIsTooShort();
    }
  }

  merge(versionId: number, newContent: Content) {
    if (this.originatingVersionId !== versionId) {
      this.id = undefined;
      this.parentId = newContent.id;
      this.originatingVersionId = versionId;
    }

    this.title = newContent.title;
    this.description = newContent.description;
  }

  abstract hasContent(): boolean;

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

  mapToDatabaseDto() {
    return {
      id: this.id,
      originatingVersionId: this.originatingVersionId,
      parentId: this.parentId,
      title: this.title,
      description: this.description,
      order: this.order,
      type: this.type,
    };
  }

  static mapFromDatabaseDto(dto: ActivityContentSelectDTO) {
    if (!dto.type) throw new Error("Content saved in db has no type");

    return this.mapFromDto({
      type: dto.type,
      order: dto.order || 0,
      payload: {
        video: {
          tracks: dto.tracks || undefined,
          videoUrl: dto.videoUrl || undefined,
        },
        image: {
          url: dto.imageUrl || undefined,
        },
        text: {
          text: dto.text || undefined,
        },
      },
      title: dto.title || undefined,
      description: dto.description || undefined,
      id: dto.id,
      parentId: dto.parentId || undefined,
      originatingVersionId: dto.originatingVersionId || undefined,
    });
  }

  static mapFromDto(dto: ContentDTO) {
    let newContent = null;

    // instanciate specific type and map payload
    switch (dto.type) {
      case "Video":
        newContent = new VideoContent();
        break;
      case "Image":
        newContent = new ImageContent();
        break;
      case "Text":
        newContent = new TextContent();
        break;
      default:
        throw new ContentTypeNotFound();
    }

    // map rest of properties
    newContent.mapPayloadFromDto(dto);

    newContent.title = dto.title;
    newContent.description = dto.description;
    newContent.order = dto.order;

    newContent.originatingVersionId = dto.originatingVersionId;
    newContent.id = dto.id;
    newContent.parentId = dto.parentId;

    return newContent;
  }
}
