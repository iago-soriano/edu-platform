import {
  DomainRules,
  TextContentIsTooLarge,
  TextContentIsTooSmall,
} from "@edu-platform/common";
import { Content } from "./base";

export class TextContent extends Content {
  static validateTextLength(text: string) {
    if (text.length > DomainRules.CONTENT.TEXT.MAX_LENGTH) {
      throw new TextContentIsTooLarge();
    } else if (text.length < DomainRules.CONTENT.TEXT.MIN_LENGTH) {
      throw new TextContentIsTooSmall();
    }
  }

  static validateText(text: string, title: string, description: string) {
    // Content.validateTitle(title);
    // Content.validateDescription(description);
    // TextContent.validateTextLength(text);
  }
}
