import { ValueObject } from "@domain/abstract";
import { InvalidStateError } from "@edu-platform/common";

const titleMaxLength = 50;
const titleMinLength = 5;

export class ActivityVersionTitle extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data)
      throw new InvalidStateError("Activity title cannot be null", {
        fieldName: "title",
      });
    if (this._data.length > titleMaxLength) {
      throw new Error(
        `Título é long demais. Tamanho máximo permitido é de ${titleMaxLength} caracteres`
      );
    } else if (this._data.length < titleMinLength) {
      throw new Error(
        `Título é curto demais. Tamanho mínimo permitido é de ${titleMinLength} caracteres`
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
