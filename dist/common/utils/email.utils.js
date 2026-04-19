"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer")); //type is required from @types 
const config_1 = require("../../config");
const sendMail = ({ to, subject, html }) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: config_1.MAIL_EMAIL,
            pass: config_1.MAIL_PASSWORD,
        },
    });
    transporter.sendMail({
        from: `"Velora-Sro"<${config_1.MAIL_EMAIL}>`,
        to,
        subject,
        html
    });
};
exports.sendMail = sendMail;
