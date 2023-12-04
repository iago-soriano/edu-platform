import { IEmailService } from "@interfaces";
import {
  VerifyAccountEmailTemplate,
  ForgotPasswordEmailTemplate,
} from "./templates";
import nodemailer from "nodemailer";
import * as EmailValidator from "email-validator";

export const validateEmail = EmailValidator.validate;

export class EmailService implements IEmailService {
  _transporter;
  from = '"Iago Soriano" <iago.srm.is@gmail.com>';

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_SECRET,
      },
    });
  }

  async sendForgotPasswordEmail({ destination, url }) {
    const resp = await this._transporter.sendMail({
      from: this.from,
      to: destination, // list of receivers
      subject: "Altere sua senha", // Subject line
      //text: "Altere sua senha", // plain text body
      html: ForgotPasswordEmailTemplate({ url }), // html body
    });
  }

  async sendVerifyAccountEmail({ destination, url }) {
    const resp = await this._transporter.sendMail({
      from: this.from,
      to: destination, // list of receivers
      subject: "Verifique sua conta", // Subject line
      html: VerifyAccountEmailTemplate({ url }), // html body
    });
  }
}
