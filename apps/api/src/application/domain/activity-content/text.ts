import { ContentDTO } from "@dto";
import { Content } from "./base";
import { DomainRules } from "@edu-platform/common";

export class TextContent extends Content {
  public text: string = "";

  constructor() {
    super("Text");
  }

  mergePayload(newContent: TextContent) {
    this.text = newContent.text;
  }

  validatePayload() {
    if (this.text.length > DomainRules.CONTENT.TEXT.MAX_LENGTH)
      throw new Error("Text Content is too long");

    if (this.text.length < DomainRules.CONTENT.TEXT.MIN_LENGTH)
      throw new Error("Text Content is too short");
  }

  hasContent() {
    return !!this.text;
  }

  shouldUploadFile(): boolean {
    return false;
  }

  setFileUrl(_: string) {
    throw new Error(`${this.type} type does not implement files`);
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
