import { BaseContentDTODataBuilder } from "@test";
import { ContentTypes } from "@domain";

export class ImageContentDTODataBuilder extends BaseContentDTODataBuilder {
  constructor() {
    super();
    this.withType(ContentTypes.Image);
  }

  reset() {
    super.reset();
    this.data.payload.image = { url: "url falsfdsffdsa" };
  }

  withPayload(payload: { url: string }) {
    this.data.payload.image = payload;
    return this;
  }
}
