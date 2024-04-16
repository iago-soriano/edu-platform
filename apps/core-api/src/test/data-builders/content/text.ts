import { DomainRules } from "@edu-platform/common";
import { BaseContentDTODataBuilder } from "./base";
import { ContentTypes } from "@domain";

export class TextContentDTODataBuilder extends BaseContentDTODataBuilder {
  constructor() {
    super();
    this.withType(ContentTypes.Text);
  }

  reset() {
    super.reset();
    this.withType(ContentTypes.Text);
    this.data.payload.text = {
      text: "t".repeat(
        (DomainRules.CONTENT.TEXT.MAX_LENGTH +
          DomainRules.CONTENT.TEXT.MIN_LENGTH) /
          2
      ),
    };
  }

  withPayload(payload: { text: string }) {
    this.data.payload.text = payload;
    return this;
  }

  withLongText() {
    this.data.payload.text = {
      text: "t".repeat(DomainRules.CONTENT.TEXT.MAX_LENGTH + 1),
    };
    return this;
  }

  withShortText() {
    this.data.payload.text = {
      text: "t".repeat(DomainRules.CONTENT.TEXT.MIN_LENGTH - 1),
    };
    return this;
  }
}
