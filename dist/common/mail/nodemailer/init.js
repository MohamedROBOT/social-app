"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_service_1 = require("./nodemailer.service");
exports.default = new nodemailer_service_1.NodeMailerProvider();
//or export const nodeMailerProvider = new NodeMailerProvider({...})
