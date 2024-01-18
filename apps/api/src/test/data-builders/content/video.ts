import { BaseContentDTODataBuilder } from "@test";
import { ContentTypes } from "@domain";

export class VideoContentDTODataBuilder extends BaseContentDTODataBuilder {
  constructor() {
    super();
    this.withType(ContentTypes.Video);
  }

  reset() {
    super.reset();
    this.data.payload.video = {
      url: "url falsfdsffdsa",
      tracks: "sgsfgfdgfd,gdfgdfgd,gdfgdf",
    };
  }

  withPayload(payload: { url: string; tracks: string }) {
    this.data.payload.video = payload;
  }
}
