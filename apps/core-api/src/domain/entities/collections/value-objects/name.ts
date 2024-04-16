import { ValueObject } from "@domain/abstract";

const nameMaxLength = 50;
const nameMinLength = 5;

export class CollectionName extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data) throw new Error("Activity description cannot be null");
    if (this._data.length > nameMaxLength) {
      throw new Error(
        `Nome é long demais. Tamanho máximo permitido é de ${nameMaxLength} caracteres`
      );
    } else if (this._data.length < nameMinLength) {
      throw new Error(
        `Nome é curto demais. Tamanho mínimo permitido é de ${nameMinLength} caracteres`
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
