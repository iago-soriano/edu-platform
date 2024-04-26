import { ValueObject } from "@edu-platform/common/platform";
import { InvalidStateError } from "@edu-platform/common";

const descriptionMaxLength = 50;
const descriptionMinLength = 5;

const throwDescriptionValidationError = (message: string) => {
  throw new InvalidStateError(message, { fieldName: "description" });
};

export class ActivityVersionDescription extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data)
      throwDescriptionValidationError("Activity description cannot be null");
    if (this._data!.length > descriptionMaxLength) {
      throwDescriptionValidationError(
        `Activity description is too long. Max length allowed is ${descriptionMaxLength} characters`
      );
    } else if (this._data!.length < descriptionMinLength) {
      throwDescriptionValidationError(
        `Activity description is too short. Min length allowed is ${descriptionMinLength} characters`
      );
    }
  }

  toString() {
    return this._data || "";
  }
}
