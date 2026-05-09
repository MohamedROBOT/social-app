import { MAIL_EMAIL, MAIL_PASSWORD } from "../../../config";
import { NodeMailerProvider } from "./nodemailer.service";

export default new NodeMailerProvider({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: MAIL_EMAIL,
    pass: MAIL_PASSWORD,
  },
});

//or export const nodeMailerProvider = new NodeMailerProvider({...})
