import { Content, ContentTypes } from "./base";
import {
  DomainRules,
  TextContentIsTooLong,
  TextContentIsTooShort,
  CustomError,
  ContentRequestDTO,
} from "@edu-platform/common";

export class TextContent extends Content {
  public text?: string;

  constructor() {
    super(ContentTypes.Text);
  }

  hasContent() {
    return !!this.text;
  }

  _mergePayload(newValues: ContentRequestDTO) {
    if (newValues.payload?.text?.text !== undefined)
      this.text = newValues.payload.text.text;
  }

  _validatePayload() {
    if (!this.text) return;
    if (this.text.length > DomainRules.CONTENT.TEXT.MAX_LENGTH)
      throw new TextContentIsTooLong();

    if (this.text.length < DomainRules.CONTENT.TEXT.MIN_LENGTH)
      throw new TextContentIsTooShort();
  }
}
