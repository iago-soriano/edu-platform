import { Content } from "./base";
import {
  TextContentIsTooLarge,
  TextContentIsTooSmall,
  DomainRules,
} from "@edu-platform/common";

export class TextContent extends Content {
  public constructor(
    public content: string,
    public title: string,
    public description: string
  ) {
    super(title, description);
    if (content) this.validateContent();
  }
  validateContent() {
    if (this.content.length > DomainRules.CONTENT.TEXT.MAX_LENGTH) {
      throw new TextContentIsTooLarge();
    } else if (this.content.length < DomainRules.CONTENT.TEXT.MIN_LENGTH) {
      throw new TextContentIsTooSmall();
    }
  }
}
