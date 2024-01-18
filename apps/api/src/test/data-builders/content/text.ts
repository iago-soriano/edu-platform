import { BaseContentDTODataBuilder } from "@test";
import { ContentTypes } from "@domain";

export class TextContentDTODataBuilder extends BaseContentDTODataBuilder {
  constructor() {
    super();
    this.withType(ContentTypes.Text);
  }

  reset() {
    super.reset();
    this.data.payload.text = { text: "textofsdfsdfsdfsfsd" };
  }

  withPayload(payload: { text: string }) {
    this.data.payload.text = payload;
  }
}
