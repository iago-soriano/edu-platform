import { ContentDTO } from "@dto";
import { Content, ContentTypes } from "./base";
import {
  DomainRules,
  TextContentIsTooLong,
  TextContentIsTooShort,
} from "@edu-platform/common";
import { ContentDoesNotImplementFiles } from "@edu-platform/common/errors/domain/content";

export class TextContent extends Content {
  public text: string = "";

  constructor() {
    super(ContentTypes.Text);
  }

  mergePayload(newContent: TextContent) {
    this.text = newContent.text;
  }

  validatePayload() {
    if (this.text.length > DomainRules.CONTENT.TEXT.MAX_LENGTH)
      throw new TextContentIsTooLong();

    if (this.text.length < DomainRules.CONTENT.TEXT.MIN_LENGTH)
      throw new TextContentIsTooShort();
  }

  hasContent() {
    return !!this.text;
  }

  storedFileUrl() {
    return null;
  }

  shouldUploadFile(): boolean {
    return false;
  }

  setFileUrl(_: string) {
    throw new ContentDoesNotImplementFiles(this.type);
  }

  mapPayloadFromDto(dto: ContentDTO) {
    this.text = dto.payload.text?.text || "";
  }

  mapToDatabaseDto() {
    return {
      ...super.mapToDatabaseDto(),
      text: this.text,
    };
  }
}
