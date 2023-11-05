import {
  InvalidPasswordError,
  InvalidRoleError,
  InvalidNameError,
  InvalidEmailError,
} from "@edu-platform/common/errors";
import { validateEmail } from "@infrastructure";
import { AuthRules, DomainRules } from "@edu-platform/common/domain";

interface UserConstructorParams {
  name?: string;
  role?: string;
  email?: string;
  password?: string;
}

export class User {
  email?: string;
  name?: string;
  role: string;
  password: string;

  constructor(args: UserConstructorParams) {
    if (args.email) this.setEmail(args.email);
    if (args.password) this.setPassword(args.password);
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
