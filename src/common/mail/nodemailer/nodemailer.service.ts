import nodemailer, { Transporter } from "nodemailer";
import { IMailProvider } from "../mail.interface";
import { MAIL_EMAIL, MAIL_PASSWORD } from "../../../config";
//we represent the object with interface
interface NodeMailerConfig {
  service: string;
  host: string;
  port: number;
  auth: { user: string; pass: string };
}

//low level module that implements abstraction
export class NodeMailerProvider implements IMailProvider {
  private transporter: Transporter;
  constructor(config: NodeMailerConfig) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      host: config.host,
      port: config.port,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({to,subject,html})
  }
}

