import { AbstractBuilder, EmailGenerator, PasswordGenerator } from "@test";
import { UserSelectDTO } from "@interfaces";

const emailGenerator = new EmailGenerator();
const passwordGenerator = new PasswordGenerator();

export class UserDTODataBuilder extends AbstractBuilder<
  Partial<UserSelectDTO>
> {
  constructor() {
    super();
  }

  reset() {
    this.data = {
      id: 1,
      email: emailGenerator.getValidEmail(),
      hashedPassword: "hashed-password",
      name: "valid",
      emailVerified: true,
    };
  }

  withInvalidEmail() {
    this.data.email = emailGenerator.getInvalidEmails()[0];
    return this;
  }
}
