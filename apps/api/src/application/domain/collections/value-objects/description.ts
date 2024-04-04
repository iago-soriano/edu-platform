import { ValueObject } from "../../abstract";

const descriptionMaxLength = 50;
const descriptionMinLength = 5;

export class CollectionDescription extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data) throw new Error("Activity description cannot be null");
    if (this._data.length > descriptionMaxLength) {
      throw new Error(
        `Descrição é longa demais. Tamanho máximo permitido é de ${descriptionMaxLength} caracteres`
      );
    } else if (this._data.length < descriptionMinLength) {
      throw new Error(
        `Descrição é curta demais. Tamanho mínimo permitido é de ${descriptionMinLength} caracteres`
      );
    }
  }

  toString() {
    return this._data || "";
  }
}
