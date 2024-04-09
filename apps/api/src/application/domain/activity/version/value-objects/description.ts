import { ValueObject } from "../../../abstract";
import { InvalidStateError } from "@edu-platform/common";

const descriptionMaxLength = 50;
const descriptionMinLength = 5;

export class ActivityVersionDescription extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data)
      throw new InvalidStateError("Activity description cannot be null", {
        fieldName: "description",
      });
    if (this._data.length > descriptionMaxLength) {
      throw new InvalidStateError(
        `Descrição é longa demais. Tamanho máximo permitido é de ${descriptionMaxLength} caracteres`
      );
    } else if (this._data.length < descriptionMinLength) {
      throw new InvalidStateError(
        `Descrição é curta demais. Tamanho mínimo permitido é de ${descriptionMinLength} caracteres`
      );
    }
  }

  toString() {
    return this._data || "";
  }
}
