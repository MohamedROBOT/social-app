"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../config");
const nodemailer_service_1 = require("./nodemailer.service");
exports.default = new nodemailer_service_1.NodeMailerProvider({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: config_1.MAIL_EMAIL,
        pass: config_1.MAIL_PASSWORD,
    },
});
//or export const nodeMailerProvider = new NodeMailerProvider({...})
