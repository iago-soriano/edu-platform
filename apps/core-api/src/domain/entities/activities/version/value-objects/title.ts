import { ValueObject } from "@edu-platform/common/platform";
import { InvalidStateError } from "@edu-platform/common";

const titleMaxLength = 50;
const titleMinLength = 5;

const throwTitleValidationError = (message: string) => {
  throw new InvalidStateError(message, { fieldName: "title" });
};

export class ActivityVersionTitle extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data) throwTitleValidationError("Activity title cannot be null");
    if (this._data!.length > titleMaxLength) {
      throwTitleValidationError(
        `Title is too long. Max length allowed is ${titleMaxLength} characters`
      );
    } else if (this._data!.length < titleMinLength) {
      throwTitleValidationError(
        `Title is too short. Min length allowed is ${titleMinLength} characters`
      );
    }
  }

  toString() {
    return this._data || "";
  }

  isEmpty() {
    return !this._data;
  }
}
