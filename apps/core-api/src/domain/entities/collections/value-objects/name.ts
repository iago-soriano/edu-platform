import { InvalidStateError } from "@edu-platform/common";
import { ValueObject } from "@edu-platform/common/platform";

const nameMaxLength = 50;
const nameMinLength = 5;

const throwNameValidationError = (message: string) => {
  throw new InvalidStateError(message, { fieldName: "name" });
};

export class CollectionName extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data) throwNameValidationError("Collection name cannot be null");
    if (this._data!.length > nameMaxLength) {
      throwNameValidationError(
        `Collection name is too long. Max length allowed is ${nameMaxLength} characters`
      );
    } else if (this._data!.length < nameMinLength) {
      throwNameValidationError(
        `Collection name is too short. Min length allowed is ${nameMinLength} characters`
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
