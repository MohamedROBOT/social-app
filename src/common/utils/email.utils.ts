import nodemailer from "nodemailer"; //type is required from @types 
import { MAIL_EMAIL, MAIL_PASSWORD } from "../../config";
import { MailOptions } from "nodemailer/lib/json-transport";
export const sendMail = ({to,subject,html}:MailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: MAIL_EMAIL,
      pass: MAIL_PASSWORD,
    },
  });

  transporter.sendMail({
    from: `"Velora-Sro"<${MAIL_EMAIL}>`,
    to,
    subject,
    html
  })
};
