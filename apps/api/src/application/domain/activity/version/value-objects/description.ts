import { ValueObject } from "../../../abstract";

const descriptionMaxLength = 50;
const descriptionMinLength = 5;

import { CustomError } from "@edu-platform/common";

export class ActivityDescriptionIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  static message = `Descrição é longa demais. Tamanho máximo permitido é de ${descriptionMaxLength} caracteres`;
  constructor() {
    super("", { description: ActivityDescriptionIsTooLong.message });
  }
}

export class ActivityDescriptionIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  static message = `Descrição é curta demais. Tamanho mínimo permitido é de ${descriptionMinLength} caracteres`;
  constructor() {
    super("", { description: ActivityDescriptionIsTooShort.message });
  }
}

export class ActivityVersionDescription extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data) throw new Error("Activity description cannot be null");
    if (this._data.length > descriptionMaxLength) {
      throw new ActivityDescriptionIsTooLong();
    } else if (this._data.length < descriptionMinLength) {
      throw new ActivityDescriptionIsTooShort();
    }
  }

  toString() {
    return this._data || "";
  }
}
