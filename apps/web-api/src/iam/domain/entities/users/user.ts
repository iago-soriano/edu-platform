import {
  InvalidStateError,
  SilentInvalidStateError,
} from "@edu-platform/common/errors";
import { validateEmail } from "@edu-platform/common/platform/services";
import { AuthRules, DomainRules } from "@edu-platform/common/domain";

export class User {
  // public id!: number;

  constructor(
    public id: number,
    public name?: string,
    public email?: string,
    public password?: string
  ) {
    if (email) this.setEmail(email);
    if (password) this.setPassword(password);
  }

  setEmail(email: string) {
    if (!validateEmail(email)) throw new InvalidStateError("");
    this.email = email;
  }

  setName(name: string) {
    if (
      name.length < AuthRules.NAME.MIN_LENGTH ||
      name.length > AuthRules.NAME.MAX_LENGTH
    ) {
      throw new InvalidStateError("");
    }
    this.name = name;
  }

  setPassword(password: string) {
    if (!AuthRules.PASSWORD_REGEX.test(password))
      throw new InvalidStateError("");
    this.password = password;
  }
}
