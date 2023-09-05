import { 
  IEmailService,
} from "@application/interfaces";
import sgMail from "@sendgrid/mail";

import * as EmailValidator from "email-validator";

export const validateEmail = EmailValidator.validate;

export class EmailService implements IEmailService {
  private sendgrid = sgMail;

  constructor() {
    this.sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  sendForgotPasswordEmail({ destination }) {
    return this.sendgrid.send({
        to: destination,
        from: "iago.srm.is@gmail.com",
        subject: "Troca de senha",
        html: '',
      });
  }

  sendVerifyAccountEmail({ destination }) {
    return this.sendgrid.send({
      to: destination,
      from: "iago.srm.is@gmail.com",
      subject: "Bem-vindo à plataforma!",
      html: '',
    });
  }
}
