import { BaseContentDTODataBuilder } from "./base";
import { ContentTypes } from "@domain";
import { DomainRules } from "@edu-platform/common";

export class VideoContentDTODataBuilder extends BaseContentDTODataBuilder {
  constructor() {
    super();
    this.withType(ContentTypes.Video);
  }

  reset() {
    super.reset();
    this.withType(ContentTypes.Video);
    this.data.payload.video = {
      url: "url falsfdsffdsa",
      tracks: "00:00:00-00:00:00".repeat(
        DomainRules.CONTENT.VIDEO.TRACKS_MAX_NUM - 1
      ),
    };
  }

  withPayload(payload: { url: string; tracks: string }) {
    this.data.payload.video = payload;
    return this;
  }

  withTooManyTracks() {
    this.data.payload.video!.tracks = "00:00:00-00:00:00".repeat(
      DomainRules.CONTENT.VIDEO.TRACKS_MAX_NUM + 1
    );
    return this;
  }
}
