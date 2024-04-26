import { AbstractBuilder } from ".";
import { EmailGenerator, PasswordGenerator } from "../fake-values";
import { UserSelectDTO } from "@interfaces";

const emailGenerator = new EmailGenerator();
const passwordGenerator = new PasswordGenerator();

export class UserDTODataBuilder extends AbstractBuilder<UserSelectDTO> {
  constructor() {
    super();
  }

  reset() {
    this.data = {
      id: 1,
      name: "valid",
      createdAt: new Date(),
      updatedAt: new Date(),
      email: emailGenerator.getValidEmail(),
      hashedPassword: "hashed-password",
      refreshToken: "refresh-token",
      image: "image-url",
      emailVerified: true,
      provider: "google",
      providerId: "provider-id",
      type: "Teacher",
    };
  }

  withInvalidEmail() {
    this.data.email = emailGenerator.getInvalidEmails()[0];
    return this;
  }
}
