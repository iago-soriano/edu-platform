import { IEmailService } from "../interfaces";
import {
  VerifyAccountEmailTemplate,
  ForgotPasswordEmailTemplate,
  NewStudentOutputCreatedEmailTemplate,
  StudentOutputCompletedEmailTemplate,
  FeedbackToAnswerEmailTemplate,
} from "./templates";
import nodemailer from "nodemailer";
import * as EmailValidator from "email-validator";

export const validateEmail = EmailValidator.validate;

type SendEmailArgs = {
  destination: string;
};

export class EmailService implements IEmailService {
  _transporter;
  from = '"Iago Soriano" <iago.srm.is@gmail.com>';

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        // user: "iago.srm.is@gmail.com",
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_SECRET,
      },
    });
  }

  async sendForgotPasswordEmail({ destination }: SendEmailArgs) {
    const url = `${process.env.WEB_APP_URL}/change-password`; //TODO ver quais paths passar nesse trem
    const resp = await this._transporter.sendMail({
      from: this.from,
      to: destination, // list of receivers
      subject: "Change your password", // Subject line
      html: ForgotPasswordEmailTemplate({ url }), // html body
    });
  }

  async sendVerifyAccountEmail({
    destination,
    token,
  }: SendEmailArgs & { token: string }) {
    const url = `${process.env.WEB_APP_URL}/verify-account/${token}`;
    await this._transporter.sendMail({
      from: this.from,
      to: destination, // list of receivers
      subject: "Verify your account", // Subject line
      html: VerifyAccountEmailTemplate({ url }), // html body
    });
  }
}
