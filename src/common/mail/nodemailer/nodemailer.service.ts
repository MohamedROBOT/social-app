import nodemailer, { Transporter } from "nodemailer";
import { IMailProvider } from "../mail.interface";
import { MAIL_EMAIL, MAIL_PASSWORD } from "../../../config";
import { injectable } from "tsyringe";
//we represent the object with interface
interface NodeMailerConfig {
  service: string;
  host: string;
  port: number;
  auth: { user: string; pass: string };
}
@injectable()
//low level module that implements abstraction
export class NodeMailerProvider implements IMailProvider {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: MAIL_EMAIL,
        pass: MAIL_PASSWORD,
      },
    });
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({ to, subject, html });
  }
}
