import { FileType } from "@interfaces";
import { Content, ContentTypesType } from "./base";
import { ContentDTO } from "@dto";

export class ImageContent extends Content {
  public url: string = "";

  constructor() {
    super("Image");
  }

  mergePayload(newContent: ImageContent) {
    this.url = newContent.url;
  }

  hasContent() {
    return !!this.url;
  }

  validatePayload(): void {}

  setFileUrl(url: string) {
    this.url = url;
  }

  mapPayloadFromDto(dto: ContentDTO) {
    this.url = dto.payload.image?.url || "";
    this.file = dto.payload.image?.file || null;
  }

  mapToDatabaseDto() {
    return {
      ...super.mapToDatabaseDto(),
      imageUrl: this.url,
    };
  }
}
