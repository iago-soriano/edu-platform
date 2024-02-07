import { Content, ContentTypes } from "./base";
import {
  DomainRules,
  TextContentIsTooLong,
  TextContentIsTooShort,
} from "@edu-platform/common";
import { ContentDoesNotImplementFiles } from "@edu-platform/common/errors/domain/content";

export class TextContent extends Content {
  public text?: string;

  constructor() {
    super(ContentTypes.Text);
  }

  mergePayload(newContent: TextContent) {
    if (newContent.text) this.text = newContent.text;
  }

  validatePayload() {
    if (!this.text) return;
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
}
