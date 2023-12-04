import {
  DomainRules,
  VideoContentIsTooLarge,
  VideoContentIsTooSmall,
} from "@edu-platform/common";
import { Content } from "./base";

export class VideoContent extends Content {
  /*   static validateVideoUrlLength(video: string) {
    if (video.length > DomainRules.CONTENT.VIDEO.MAX_LENGTH) {
      throw new VideoContentIsTooLarge();
    } else if (video.length < DomainRules.CONTENT.VIDEO.MIN_LENGTH) {
      throw new VideoContentIsTooSmall();
    }
  } */

  static validadeStartAndEndTimes(startTime: string, endTime: string) {}

  static validateVideo(video: string, title: string, description: string) {
    // Content.validateTitle(title);
    // Content.validateDescription(description);
    //VideoContent.validateVideoUrlLength(video);
  }

  //validar se é url - começa com https
}
