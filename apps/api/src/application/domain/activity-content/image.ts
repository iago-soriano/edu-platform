import {
  DomainRules,
  ImageContentIsTooLarge,
  ImageContentIsTooSmall,
} from "@edu-platform/common";
import { Content } from "./base";

export class ImageContent extends Content {
  static validateImageSize(image: string) {
    if (image.length > DomainRules.CONTENT.IMAGE.MAX_LENGTH) {
      throw new ImageContentIsTooLarge();
    } else if (image.length < DomainRules.CONTENT.IMAGE.MIN_LENGTH) {
      throw new ImageContentIsTooSmall();
    }
  }

  static validateImage(image: string, title: string, description: string) {
    // Content.validateTitle(title);
    // Content.validateDescription(description);
    // ImageContent.validateImageSize(image);
  }
}
