import { IEmailService } from "../interfaces";
import {
  VerifyAccountEmailTemplate,
  ForgotPasswordEmailTemplate,
  NewStudentOutputEmailTemplate,
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
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: "iago.srm.is@gmail.com",
        pass: process.env.EMAIL_SECRET,
      },
    });
  }

  async sendForgotPasswordEmail({ destination }: SendEmailArgs) {
    const url = `${process.env.WEB_APP_URL}/change-password`; //TODO ver quais paths passar nesse trem
    const resp = await this._transporter.sendMail({
      from: this.from,
      to: destination, // list of receivers
      subject: "Altere sua senha", // Subject line
      //text: "Altere sua senha", // plain text body
      html: ForgotPasswordEmailTemplate({ url }), // html body
    });
  }

  async sendVerifyAccountEmail({ destination }: SendEmailArgs) {
    const url = `${process.env.WEB_APP_URL}/verify-account`;
    const resp = await this._transporter.sendMail({
      from: this.from,
      to: destination, // list of receivers
      subject: "Verifique sua conta", // Subject line
      html: VerifyAccountEmailTemplate({ url }), // html body
    });
  }

  async sendStudentOutputCompletedEmail({
    destination,
    studentOutputId,
    studentName,
    activityTitle,
  }: SendEmailArgs & {
    studentOutputId: number;
    studentName: string;
    activityTitle: string;
  }) {
    const url = `${process.env.WEB_APP_URL}/teacher-area/dashboard/student-outputs/${studentOutputId}`; //não sei o path desse aqui
    const resp = await this._transporter.sendMail({
      from: this.from,
      to: destination, // list of receivers
      subject: `New output from ${studentName} to ${activityTitle}`, // Subject line
      html: NewStudentOutputEmailTemplate({ url }), // html body
    });
  }
}
