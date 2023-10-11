import { 
  IEmailService,
} from "@interfaces";
import nodemailer from 'nodemailer';
import * as EmailValidator from "email-validator";

export const validateEmail = EmailValidator.validate;

export class EmailService implements IEmailService {

  _transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_SECRET
      }
    });
  }

  async sendForgotPasswordEmail({ destination }) {
    const resp = await this._transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: destination, // list of receivers
      subject: "Altere sua senha", // Subject line
      //text: "Altere sua senha", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }

  async sendVerifyAccountEmail({ destination, url }) {
    const resp = await this._transporter.sendMail({
      from: '"Iago" <iago@example.com>', // sender address
      to: destination, // list of receivers
      subject: "Verifique sua conta", // Subject line
      html: `<a href="${url}">Clique para verificar</a>`, // html body
    });
  }
}
