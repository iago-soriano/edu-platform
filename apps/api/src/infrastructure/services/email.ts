import { 
  IEmailService,
} from "@interfaces";
import nodemailer from 'nodemailer';
import * as EmailValidator from "email-validator";

export const validateEmail = EmailValidator.validate;

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 465,
  secure: false,
  auth: {
    user: 'dbf821946d8c44',
    pass: 'ff92b6183d2fcd'
  }
});

export class EmailService implements IEmailService {

  async sendForgotPasswordEmail({ destination }) {
    const resp = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: destination, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }

  async sendVerifyAccountEmail({ destination, url }) {
    const resp = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: destination, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }
}
