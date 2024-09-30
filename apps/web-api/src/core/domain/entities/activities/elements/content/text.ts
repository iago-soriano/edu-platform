import { Content, ContentTypes } from "./base";
import {
  DomainRules,
  SaveContentRequestBody,
  InvalidStateError,
} from "@edu-platform/common";

const throwPayloadValidationError = (message: string) => {
  throw new InvalidStateError(message, { fieldName: "text" });
};

export class TextContent extends Content {
  public text?: string;

  constructor() {
    super(ContentTypes.Text);
  }

  hasContent() {
    return !!this.text;
  }

  _mergePayload(newValues: SaveContentRequestBody) {
    if (newValues.payload?.text?.text !== undefined)
      this.text = newValues.payload.text.text;
  }

  _validatePayload() {
    if (!this.text) return;
    if (this.text.length > DomainRules.CONTENT.TEXT.MAX_LENGTH)
      throwPayloadValidationError(
        `Text is too long. Max length allowed is ${DomainRules.CONTENT.TEXT.MAX_LENGTH} characters`
      );

    if (this.text.length < DomainRules.CONTENT.TEXT.MIN_LENGTH)
      throwPayloadValidationError(
        `Text is too short. Min length allowed is ${DomainRules.CONTENT.TEXT.MIN_LENGTH} characters`
      );
  }
}
