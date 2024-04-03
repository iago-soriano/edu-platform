import { ValueObject } from "../../../abstract";

const titleMaxLength = 50;
const titleMinLength = 5;

import { CustomError } from "@edu-platform/common";

export class ActivityTitleIsTooLong extends CustomError {
  HTTPstatusCode = 400;
  static message = `Título é long demais. Tamanho máximo permitido é de ${titleMaxLength} caracteres`;
  constructor() {
    super("", { title: ActivityTitleIsTooLong.message });
  }
}

export class ActivityTitleIsTooShort extends CustomError {
  HTTPstatusCode = 400;
  static message = `Título é curto demais. Tamanho mínimo permitido é de ${titleMinLength} caracteres`;
  constructor() {
    super("", { title: ActivityTitleIsTooShort.message });
  }
}

export class ActivityVersionTitle extends ValueObject {
  constructor(aData: string | null) {
    super(aData || "");
  }
  validate() {
    if (!this._data) throw new Error("Activity description cannot be null");
    if (this._data.length > titleMaxLength) {
      throw new ActivityTitleIsTooLong();
    } else if (this._data.length < titleMinLength) {
      throw new ActivityTitleIsTooShort();
    }
  }

  toString() {
    return this._data || "";
  }

  isEmpty() {
    return !this._data;
  }
}
