import { InvalidStateError } from "@edu-platform/common";
import { ValueObject } from "@edu-platform/common/platform";

const descriptionMaxLength = 50;
const descriptionMinLength = 5;

const throwDescriptionValidationError = (message: string) => {
  throw new InvalidStateError(message, { fieldName: "description" });
};

export class CollectionDescription extends ValueObject {
  constructor(aData: string | null) {
    super(aData);
  }
  validate() {
    if (!this._data) return;
    if (this._data.length > descriptionMaxLength) {
      throwDescriptionValidationError(
        `Description is too long. Max length allowed is ${descriptionMaxLength} characters`
      );
    } else if (this._data.length < descriptionMinLength) {
      throwDescriptionValidationError(
        `Description is too short. Min length allowed is ${descriptionMinLength} characters`
      );
    }
  }

  toString() {
    return this._data || "";
  }
}
