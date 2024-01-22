import {
  ContentTypeNotFound,
  TitleIsTooLong,
  TitleIsTooShort,
  DomainRules,
  DescriptionIsTooLong,
  DescriptionIsTooShort,
} from "@edu-platform/common";
import { ImageContent, VideoContent, TextContent } from "@domain";
import { ActivityContentSelectDTO, FileType } from "@interfaces";
import { ContentDTO } from "@dto";

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

  merge(newContent: Content) {
    this.title = newContent.title;
    this.description = newContent.description;
    this.order = newContent.order;
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

  abstract storedFileUrl(): string | null;

  mapToDatabaseDto() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      order: this.order,
      type: this.type.toString(),
      versionId: this.versionId,
    };
  }

  static mapFromDatabaseDtoToRegularDto(
    dto: ActivityContentSelectDTO
  ): ContentDTO {
    if (!dto.type) throw new Error("Content saved in db has no type");

    return {
      type: dto.type,
      order: dto.order || 0,
      payload: {
        video: {
          tracks: dto.tracks || undefined,
          url: dto.videoUrl || undefined,
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
      versionId: dto.versionId || 0,
    };
  }

  static mapFromDatabaseDto(dto: ActivityContentSelectDTO) {
    return this.mapFromDto(Content.mapFromDatabaseDtoToRegularDto(dto));
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
    newContent.id = dto.id;
    newContent.versionId = dto.versionId;

    return newContent;
  }
}
