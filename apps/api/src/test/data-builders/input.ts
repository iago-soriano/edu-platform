import { EmailGenerator, PasswordGenerator } from "../fake-values";
import { AbstractBuilder } from ".";

const emailGenerator = new EmailGenerator();
const passwordGenerator = new PasswordGenerator();

export class AuthInputBuilder extends AbstractBuilder<{
  password?: string;
  email?: string;
  confirmPassword?: string;
  role?: string;
}> {
  constructor() {
    super();
  }
  reset() {
    this.data = {
      password: passwordGenerator.getValidPassword(),
      email: emailGenerator.getValidEmail(),
      confirmPassword: passwordGenerator.getValidPassword(),
      role: "fsdfsd",
    };
  }
  withoutPassword() {
    delete this.data.password;
    return this;
  }
  withoutEmail() {
    delete this.data.email;
    return this;
  }
  withoutRole() {
    delete this.data.role;
    return this;
  }
  withoutConfirmPassword() {
    delete this.data.confirmPassword;
    return this;
  }
  withEmail(email: string) {
    this.data.email = email;
    return this;
  }
}
