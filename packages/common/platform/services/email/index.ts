import { IEmailService } from "../interfaces";
import nodemailer from "nodemailer";
import * as EmailValidator from "email-validator";

export const validateEmail = EmailValidator.validate;

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

  async sendActivityLinkToStudent(studentEmail: string) {}

  async sendStudentOutputLinkToTeacher(requestingUserEmail: string) {}

  async sendOutputReviewToStudent(studentEmail: string) {}
}
