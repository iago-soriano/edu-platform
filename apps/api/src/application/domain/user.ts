import {
  InvalidPasswordError,
  InvalidNameError,
  InvalidEmailError,
} from "@edu-platform/common/errors";
import { validateEmail } from "@infrastructure";
import { AuthRules, DomainRules } from "@edu-platform/common/domain";

export const UserTypes = ["Teacher", "Student", "Admin"] as const;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {
    if (email) this.setEmail(email);
    if (password) this.setPassword(password);
  }

  setEmail(email: string) {
    if (!validateEmail(email)) throw new InvalidEmailError();
    this.email = email;
  }

  setName(name: string) {
    if (
      name.length < AuthRules.NAME.MIN_LENGTH ||
      name.length > AuthRules.NAME.MAX_LENGTH
    ) {
      throw new InvalidNameError();
    }
    this.name = name;
  }

  setPassword(password: string) {
    if (!AuthRules.PASSWORD_REGEX.test(password))
      throw new InvalidPasswordError();
    this.password = password;
  }
}
